from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import CompanyInfo, Business, Enquiry
from .serializers import CompanyInfoSerializer, BusinessSerializer, EnquirySerializer
from .services import sync_enquiry_to_sheets

class CompanyInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer

    def list(self, request, *args, **kwargs):
        instance = self.queryset.first()
        if not instance:
            instance = CompanyInfo.objects.create(name="SARGIA Group")
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class BusinessViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Business.objects.filter(is_active=True)
    serializer_class = BusinessSerializer

class EnquiryViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

    def perform_create(self, serializer):
        enquiry = serializer.save()
        try:
            sync_enquiry_to_sheets(enquiry)
        except Exception as e:
            print(f"Error syncing to sheets: {e}")

    @action(detail=True, methods=['post'])
    def sync_to_sheets(self, request, pk=None):
        enquiry = self.get_object()
        success = sync_enquiry_to_sheets(enquiry)
        if success:
            return Response({'status': 'synced', 'synced_to_sheets': True})
        return Response({'status': 'failed', 'synced_to_sheets': False}, status=400)
