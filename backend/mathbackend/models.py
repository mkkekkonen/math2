from django.db import models


class HierarchyNode(models.Model):
    class Meta:
        abstract = True

    slug = models.CharField(max_length=250)
    name_fi = models.CharField(max_length=500, default='-')
    name_en = models.CharField(max_length=500, default='-')
    admin_name = models.CharField(max_length=500)


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
    filename = models.CharField(max_length=250, default='error404')

    def parent_name(self) -> str:
        return self.parent.admin_name

    def __str__(self) -> str:
        return self.admin_name
