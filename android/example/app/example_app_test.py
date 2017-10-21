import subprocess
import unittest

from third_party.python.appium import webdriver


class ExampleAppTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Start the daemons.
        # TODO(peterebden): Seems like we shouldn't have to do this here, but it's
        #                   not easy to fix without completely rewriting python_test.
        cls.supervisor = subprocess.Popen(['/usr/bin/supervisord', '--configuration', 'supervisord.conf'])
        desired_caps = {}
        desired_caps['platformName'] = 'Android'
        desired_caps['platformVersion'] = '7.1.1'
        desired_caps['deviceName'] = 'Android Emulator'
        desired_caps['app'] = 'android/example/app/example_app.apk'
        cls.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.supervisor.terminate()

    def test_app_starts(self):
        self.driver.launch_app()
        button = driver.find_element_by_id('purchase_button')
        self.assertIsNotNone(button)
