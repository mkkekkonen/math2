from django.contrib import admin
from .models import Category, Page


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('admin_name', 'parent_name')


class PageAdmin(admin.ModelAdmin):
    list_display = ('admin_name', 'parent_name', 'filename')


admin.site.register(Category, CategoryAdmin)
admin.site.register(Page, PageAdmin)
