from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, AllowAny

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
