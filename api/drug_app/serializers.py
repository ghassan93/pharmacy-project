from rest_framework import serializers
from .models import Drug


class DrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drug
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")
        extra_kwargs = {
            "name": {"required": False},
            "quantity": {"required": False},
            "drug_price": {"required": False},
            "exp_time": {"required": False},
        }
