from django.test import TestCase

from rest_framework.test import APIClient


class GetPageBySlugTestCase(TestCase):
    fixtures = ('fixture.json',)

    def test_success(self):
        client = APIClient()
        response = client.get(
            '/pages/angle-classification/', format='json')

        self.assertEqual(response.data['id'], 2)

    def test_not_found(self):
        client = APIClient()
        response = client.get('/pages/foobar/', format='json')

        self.assertEqual(response.status_code, 404)
