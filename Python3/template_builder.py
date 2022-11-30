#! /usr/bin/env python
import sys

filename = sys.argv[0]
id = sys.argv[1] if len(sys.argv) > 1 else "0"
title = sys.argv[2] if len(sys.argv) > 2 else "example"

def get_solution_fullname(id: str, title: str):
    """
    get_solution_fullname

    1. padding zeros to id, add 'p' the prefix to id.

        1   -> p00001,
        101 -> p00101

    2. fix title

        two-sum -> two_sum

    """
    sol_tag = f'p{id:{0}>{5}}'
    sol_name = f'{title.lower().replace(r"-", "_")}'
    sol_fullname = f'{sol_tag}_{sol_name}'
    return sol_fullname


def get_file_solution(title):
    """
    創建解答範本
    """

    solution_text = f"""\
class Solution:
    def {title}(self) -> bool:
        return True
"""
    return (solution_text)


def get_file_test(sol_fullname, method_name):
    """
    創建測試範本
    """

    test_text = f"""\
from solutions.{sol_fullname} import Solution

def test_{sol_fullname}():
    sol = Solution()
    assert sol.{method_name}() == True
"""
    return (test_text)


def write_file_solution(sol_fullname, solution_text):
    print(f'create solution file: {sol_fullname}')
    file_solution = open(f'solutions/{sol_fullname}.py', 'w')
    file_solution.write(solution_text)


def write_file_test(sol_fullname, test_text):
    print(f'create testing file: {sol_fullname}')
    file_test = open(f'tests/test_{sol_fullname}.py', 'w')
    file_test.write(test_text)


if __name__ == '__main__':
    fullname = get_solution_fullname(id, title)
    solution_text = get_file_solution(title)
    test_text = get_file_test(fullname, title)
    write_file_solution(fullname, solution_text)
    write_file_test(fullname, test_text)

