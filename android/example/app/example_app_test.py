from android.appium_test_base import AppiumTest


class ExampleAppTest(AppiumTest):

    def test_app_starts(self):
        self.driver.launch_app()
        button = self.driver.find_element_by_id('purchase_button')
        self.assertIsNotNone(button)
