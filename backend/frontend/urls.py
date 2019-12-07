from django.conf.urls import url, include
#from django.urls import  path
from rest_framework import routers
from .views import UserViewset
from django.urls import path
from . import views

router = routers.DefaultRouter()

router.register(r'user', UserViewset)

# Inlcude the schema view in our urls.
# app_name = '[user]'

urlpatterns = [
    path('login/', views.index),
    path('register/', views.index),
    url(r'', include(router.urls)),
]

