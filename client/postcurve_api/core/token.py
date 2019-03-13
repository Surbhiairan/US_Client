from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import six


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, core, timestamp):
        return (six.text_type(core.pk) + six.text_type(timestamp)) +  six.text_type(core.is_active)
account_activation_token = AccountActivationTokenGenerator()
