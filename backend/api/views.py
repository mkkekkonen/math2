from django.http import HttpResponseNotFound

from rest_framework import viewsets, views
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response

from mathbackend.models import Category, Page

from .serializers import CategorySerializer, PageSerializer


def handle_permissions(action: str):
    if action == 'list':
        permission_classes = (AllowAny,)
    else:
        permission_classes = (IsAdminUser,)
    return (permission() for permission in permission_classes)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        return handle_permissions(self.action)


class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer

    def get_permissions(self):
        return handle_permissions(self.action)


class GetPageBySlug(views.APIView):
    queryset = Page.objects.all()
    permission_classes = (AllowAny,)

    def get(self, request, slug, format=None):
        page = Page.objects.filter(slug=slug).first()

        if not page:
            return HttpResponseNotFound()

        data = PageSerializer(page).data

        return Response(data)
