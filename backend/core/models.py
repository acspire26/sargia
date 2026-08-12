from django.db import models

class CompanyInfo(models.Model):
    name = models.CharField(max_length=255, default="SARGIA Group")
    about_text = models.TextField(blank=True)
    vision_text = models.TextField(blank=True)
    mission_text = models.TextField(blank=True)
    core_values = models.JSONField(default=list, help_text="List of core values (strings)")
    
    # Contact Info
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    address = models.TextField(blank=True)
    
    # Social URLs
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    
    class Meta:
        verbose_name_plural = "Company Info"

    def __str__(self):
        return self.name

class Business(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    logo_url = models.URLField(blank=True, help_text="URL to the business logo")
    website_url = models.URLField(blank=True, help_text="URL to the business website")
    order = models.IntegerField(default=0, help_text="Order in which it appears on the website")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name_plural = "Businesses"

    def __str__(self):
        return self.name

class Enquiry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    synced_to_sheets = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Enquiries"

    def __str__(self):
        return f"{self.name} - {self.subject}"
