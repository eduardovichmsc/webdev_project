from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, password_validation


class RegisterSerializer(serializers.Serializer):
    """Validates user registration: username, email, password, password2"""

    username  = serializers.CharField(max_length=150)
    email     = serializers.EmailField()
    password  = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Username is already taken.')
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email is already registered.')
        return value

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password2': 'Passwords do not match.'})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user


class LoginSerializer(serializers.Serializer):
    """Validates login credentials"""

    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Invalid username or password.')
        if not user.is_active:
            raise serializers.ValidationError('This account is disabled.')
        data['user'] = user
        return data


class ProfileUpdateSerializer(serializers.Serializer):
    """Validates and applies profile updates (username and/or email)"""

    username = serializers.CharField(max_length=150, required=False)
    email    = serializers.EmailField(required=False)

    def validate_username(self, value):
        user = self.context['request'].user
        if User.objects.filter(username=value).exclude(pk=user.pk).exists():
            raise serializers.ValidationError('Username is already taken.')
        return value

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.filter(email=value).exclude(pk=user.pk).exists():
            raise serializers.ValidationError('Email is already registered.')
        return value

    def validate(self, data):
        if not data:
            raise serializers.ValidationError('At least one field (username or email) must be provided.')
        return data

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email    = validated_data.get('email', instance.email)
        instance.save()
        return instance


class ChangePasswordSerializer(serializers.Serializer):
    """Validates old password and sets a new one"""

    old_password  = serializers.CharField(write_only=True)
    new_password  = serializers.CharField(write_only=True, min_length=8)
    new_password2 = serializers.CharField(write_only=True, min_length=8)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect.')
        return value

    def validate(self, data):
        if data['new_password'] != data['new_password2']:
            raise serializers.ValidationError({'new_password2': 'New passwords do not match.'})
        password_validation.validate_password(data['new_password'], self.context['request'].user)
        return data

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
