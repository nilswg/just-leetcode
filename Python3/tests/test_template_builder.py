import os
from template_builder import get_solution_fullname, get_file_solution, get_file_test, write_file_solution, write_file_test


def test_p00000_example():

    assert get_solution_fullname('0', 'example') == 'p00000_example'

    solution_text = get_file_solution('example')
    assert solution_text == f"""\
class Solution:
    def example(self) -> bool:
        return True
"""

    test_text = get_file_test('p00000_example', 'example')
    assert test_text == f"""\
from solutions.p00000_example import Solution

def test_p00000_example():
    sol = Solution()
    assert sol.example() == True
"""

    write_file_solution('p00000_example', solution_text)
    assert os.path.isfile('solutions/p00000_example.py') == True

    write_file_test('p00000_example', test_text)
    assert os.path.isfile('tests/test_p00000_example.py') == True
