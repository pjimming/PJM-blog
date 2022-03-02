from django.urls import path, include
from my_blog.views.index import index

app_name = "my_blog"

urlpatterns = [
    path("", index, name="index"),
    path("article/", include("my_blog.urls.article.index")),
]
