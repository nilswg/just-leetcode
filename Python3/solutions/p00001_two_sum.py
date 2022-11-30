class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        mp = {}
        for i, num in enumerate(nums):
            k = target - num
            if k in mp :
                return [mp[k], i]
            else :
                mp[num] = i