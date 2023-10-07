from django.db import models


class HierarchyNode(models.Model):
    class Meta:
        abstract = True

    slug = models.CharField(max_length=250)
    localization_key = models.CharField(max_length=500)


class Category(HierarchyNode):
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)


class Page(HierarchyNode):
    parent = models.ForeignKey(Category, on_delete=models.CASCADE)
