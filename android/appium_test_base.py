import logging
import os
import socket
import subprocess
import time
import unittest
from contextlib import closing

from third_party.python.appium import webdriver


class AppiumTest(unittest.TestCase):
    """AppiumTest handles the basic startup and shutdown of Appium & supporting services."""

    @classmethod
    def setUpClass(cls):
        # Start the daemons.
        # Would be nicer if we didn't need to do this here, but it's hard to know how to do that
        # without completely reimplementing python_test.
        env = os.environ.copy()
        env['PATH'] = '/usr/sbin:/usr/bin:/sbin:/bin:/root/tools:/root/platform-tools:/root/build-tools:/root/build-tools'
        cls._supervisor = subprocess.Popen(['/usr/bin/supervisord', '--configuration', 'supervisord.conf'],
                                           cwd='/root',
                                           env=env)
        logging.info('Waiting for port 4723 to open...')
        _wait_for_open_port(4723)
        # If we don't wait for this the app install fails with errors about "Can't find service: package"
        logging.info('Waiting for emulator to be ready...')
        _wait_for_emulator()
        logging.info('Opening Appium connection...')
        cls.driver = webdriver.Remote('http://127.0.0.1:4723/wd/hub', {
            'platformName': 'Android',
            'platformVersion': '7.1.1',
            'deviceName': 'Android Emulator',
            'app': os.path.join(os.getcwd(), os.environ['DATA']),
        })
        logging.info('Finished init')

    @classmethod
    def tearDownClass(cls):
        # We get a "method not implemented" error if we try to close the driver here.
        cls._supervisor.terminate()


def _wait_for_open_port(port, tries=10, delay=1.0):
    """Check if the given port has been opened."""
    for i in range(tries):
        time.sleep(delay)
        with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
            if sock.connect_ex(('127.0.0.1', port)) == 0:
                return
    raise Exception('Port %d not open' % port)


def _wait_for_emulator(tries=10, delay=4.0):
    """Checks if the emulator is ready yet."""
    for i in range(tries):
        time.sleep(delay)
        try:
            subprocess.check_call(['/root/platform-tools/adb', '-P', '5037', 'shell', 'pm', 'path', 'android'])
            return
        except subprocess.CalledProcessError as err:
            err = err
    raise err
