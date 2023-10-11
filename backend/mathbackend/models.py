from django.db import models
from django.utils.translation import gettext_lazy as _


class HierarchyNode(models.Model):
    class Meta:
        abstract = True

    slug = models.CharField(max_length=250)
    localization_key = models.CharField(max_length=500)
    admin_name = models.CharField(max_length=500)

    def localized_name(self) -> str:
        return _(self.localization_key)


class Category(HierarchyNode):
    class Meta:
        verbose_name_plural = 'Categories'

    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True)

    def parent_name(self) -> str:
        if not self.parent:
            return '-'

        return self.parent.admin_name

    def __str__(self) -> str:
        return self.admin_name


class Page(HierarchyNode):
    parent = models.ForeignKey(Category, on_delete=models.CASCADE)

    def parent_name(self) -> str:
        return self.parent.admin_name

    def __str__(self) -> str:
        return self.admin_name
