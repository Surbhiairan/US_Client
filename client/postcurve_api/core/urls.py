#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
# Python imports.
import logging

# Django imports.
from django.conf.urls import url, include

# Rest Framework imports.
from rest_framework.routers import DefaultRouter

# Third Party Library imports

# local imports.
from core.views import *

app_name = 'core'

urlpatterns = [
    url(r'^setting/$', SettingAPIView.as_view(), name='setting'),
    url(r'^forget/reset$', ForgetResetAPIView.as_view(), name='forget-reset'),
    url(r'^forget/reset$', ForgetResetAPIView.as_view(), name='forget-reset'),
    url(r'^forget/$', ForgetAPIView.as_view(), name='forget'),
    url(r'^resend/$', ResendAPIView.as_view(), name='resend'),
    url(r'^email/$', EmailAPIView.as_view(), name='email'),
    # url(r'^signup/$', SignupAPIView.as_view(), name='signup'),
    url(r'^register/$', RegistrationAPIView.as_view(), name='register-api'),
    url(r'^login/$', LoginView.as_view(), name='login-api'),
    url(r'^logout/$', LogoutView.as_view(), name='logout-api'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
       ActivateApi.as_view(), name='activate'),
     url(r'^confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
       ConfirmApi.as_view(), name='confirm'),
]
