from django.db import models


class HierarchyNode(models.Model):
    class Meta:
        abstract = True

    slug = models.CharField(max_length=250)
    localization_key = models.CharField(max_length=500)
    admin_name = models.CharField(max_length=500)


class Category(HierarchyNode):
    class Meta:
        verbose_name_plural = 'Categories'

    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self) -> str:
        return self.admin_name


class Page(HierarchyNode):
    parent = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.admin_name
