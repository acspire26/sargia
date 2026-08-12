from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyInfoViewSet, BusinessViewSet, EnquiryViewSet

router = DefaultRouter()
router.register(r'company-info', CompanyInfoViewSet, basename='company-info')
router.register(r'businesses', BusinessViewSet, basename='business')
router.register(r'enquiries', EnquiryViewSet, basename='enquiry')

urlpatterns = [
    path('', include(router.urls)),
]
