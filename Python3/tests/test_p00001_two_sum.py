from solutions.p00001_two_sum import Solution

def test_p00001_two_sum():
    sol = Solution()
    assert sol.twoSum([2,7,11,15], 9) == [0,1]
    assert sol.twoSum([3,2,4], 6) == [1,2]
    assert sol.twoSum([3,3], 6) == [0,1]
