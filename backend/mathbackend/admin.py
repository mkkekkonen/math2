from django.contrib import admin
from .models import Category, Page


class MyAdmin(admin.ModelAdmin):
    list_display = ('admin_name', 'parent_name')


admin.site.register(Category, MyAdmin)
admin.site.register(Page, MyAdmin)
