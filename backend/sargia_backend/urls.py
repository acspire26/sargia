from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

admin.site.site_url = 'http://localhost:5173/'

urlpatterns = [
    path('', RedirectView.as_view(url='http://localhost:5173/')),
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]
