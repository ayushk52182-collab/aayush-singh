import fs from 'fs';
import path from 'path';

const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] == 9, so we return [0, 1]." },
      { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]", explanation: "nums[1] + nums[2] == 6." }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n    unordered_map<int, int> seen;\n    for(int i = 0; i < (int)nums.size(); i++) {\n        int complement = target - nums[i];\n        if(seen.count(complement)) {\n            return {seen[complement], i};\n        }\n        seen[nums[i]] = i;\n    }\n    return {};\n}\n\nint main() {\n    vector<int> nums = {2, 7, 11, 15};\n    int target = 9;\n    vector<int> result = twoSum(nums, target);\n    cout << "[" << result[0] << ", " << result[1] << "]" << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\n\nvoid twoSum(int* nums, int numsSize, int target, int* res) {\n    for(int i = 0; i < numsSize; i++) {\n        for(int j = i + 1; j < numsSize; j++) {\n            if(nums[i] + nums[j] == target) {\n                res[0] = i; res[1] = j;\n                return;\n            }\n        }\n    }\n}\n\nint main() {\n    int nums[] = {2, 7, 11, 15};\n    int res[2];\n    twoSum(nums, 4, 9, res);\n    printf("[%d, %d]\\n", res[0], res[1]);\n    return 0;\n}`,
      java: `import java.util.*;\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[]{map.get(comp), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        int[] res = twoSum(new int[]{2, 7, 11, 15}, 9);\n        System.out.println("[" + res[0] + ", " + res[1] + "]");\n    }\n}`,
      python: `def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        comp = target - x\n        if comp in seen:\n            return [seen[comp], i]\n        seen[x] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))`
    },
    testCases: [
      { input: "[2, 7, 11, 15], target = 9", expected: "[0, 1]" },
      { input: "[3, 2, 4], target = 6", expected: "[1, 2]" },
      { input: "[3, 3], target = 6", expected: "[0, 1]" }
    ]
  },
  {
    id: "reverse-array",
    title: "Reverse an Array",
    difficulty: "Easy",
    topic: "Arrays",
    description: "Given an array of integers, reverse the array in-place without allocating extra array memory.",
    constraints: "1 <= arr.length <= 10^5\n-10^9 <= arr[i] <= 10^9",
    examples: [
      { input: "arr = [1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]", explanation: "Elements are reversed end-to-end." }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid reverseArray(vector<int>& arr) {\n    int l = 0, r = arr.size() - 1;\n    while(l < r) {\n        swap(arr[l++], arr[r--]);\n    }\n}\n\nint main() {\n    vector<int> arr = {1, 2, 3, 4, 5};\n    reverseArray(arr);\n    for(int x : arr) cout << x << " ";\n    cout << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nvoid reverse(int* arr, int n) {\n    int l = 0, r = n - 1;\n    while(l < r) {\n        int tmp = arr[l]; arr[l++] = arr[r]; arr[r--] = tmp;\n    }\n}\nint main() {\n    int a[] = {1, 2, 3, 4, 5};\n    reverse(a, 5);\n    for(int i = 0; i < 5; i++) printf("%d ", a[i]);\n    printf("\\n");\n    return 0;\n}`,
      java: `public class Solution {\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3, 4, 5};\n        int l = 0, r = a.length - 1;\n        while(l < r) {\n            int t = a[l]; a[l++] = a[r]; a[r--] = t;\n        }\n        for(int x : a) System.out.print(x + " ");\n        System.out.println();\n    }\n}`,
      python: `arr = [1, 2, 3, 4, 5]\narr.reverse()\nprint(" ".join(map(str, arr)))`
    },
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expected: "5 4 3 2 1" },
      { input: "[10, 20]", expected: "20 10" }
    ]
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray (Kadane's)",
    difficulty: "Medium",
    topic: "Arrays",
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    examples: [
      { input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", output: "6", explanation: "The subarray [4, -1, 2, 1] has the largest sum 6." }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    int maxSoFar = nums[0], curr = nums[0];\n    for(size_t i = 1; i < nums.size(); i++) {\n        curr = max(nums[i], curr + nums[i]);\n        maxSoFar = max(maxSoFar, curr);\n    }\n    return maxSoFar;\n}\n\nint main() {\n    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    cout << "Max Subarray: " << maxSubArray(nums) << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint maxSubArray(int* nums, int n) {\n    int maxSoFar = nums[0], curr = nums[0];\n    for(int i = 1; i < n; i++) {\n        curr = (nums[i] > curr + nums[i]) ? nums[i] : (curr + nums[i]);\n        if(curr > maxSoFar) maxSoFar = curr;\n    }\n    return maxSoFar;\n}\nint main() {\n    int a[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    printf("Max: %d\\n", maxSubArray(a, 9));\n    return 0;\n}`,
      java: `public class Solution {\n    public static int maxSubArray(int[] nums) {\n        int max = nums[0], curr = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            curr = Math.max(nums[i], curr + nums[i]);\n            max = Math.max(max, curr);\n        }\n        return max;\n    }\n    public static void main(String[] args) {\n        System.out.println("Max: " + maxSubArray(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4}));\n    }\n}`,
      python: `def max_sub_array(nums):\n    max_so_far = curr = nums[0]\n    for x in nums[1:]:\n        curr = max(x, curr + x)\n        max_so_far = max(max_so_far, curr)\n    return max_so_far\nprint("Max:", max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4]))`
    },
    testCases: [
      { input: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]", expected: "6" },
      { input: "[1]", expected: "1" },
      { input: "[5, 4, -1, 7, 8]", expected: "23" }
    ]
  },
  {
    id: "best-time-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Arrays",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit.",
    constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
    examples: [
      { input: "prices = [7, 1, 5, 3, 6, 4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5." }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    int minPrice = 1e9, maxProfit = 0;\n    for(int p : prices) {\n        minPrice = min(minPrice, p);\n        maxProfit = max(maxProfit, p - minPrice);\n    }\n    return maxProfit;\n}\n\nint main() {\n    vector<int> p = {7, 1, 5, 3, 6, 4};\n    cout << "Max profit: " << maxProfit(p) << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint maxProfit(int* prices, int n) {\n    int minPrice = 1000000, profit = 0;\n    for(int i = 0; i < n; i++) {\n        if(prices[i] < minPrice) minPrice = prices[i];\n        else if(prices[i] - minPrice > profit) profit = prices[i] - minPrice;\n    }\n    return profit;\n}\nint main() {\n    int p[] = {7, 1, 5, 3, 6, 4};\n    printf("Profit: %d\\n", maxProfit(p, 6));\n    return 0;\n}`,
      java: `public class Solution {\n    public static void main(String[] args) {\n        int[] p = {7, 1, 5, 3, 6, 4};\n        int minP = Integer.MAX_VALUE, maxProf = 0;\n        for(int x : p) {\n            minP = Math.min(minP, x);\n            maxProf = Math.max(maxProf, x - minP);\n        }\n        System.out.println("Profit: " + maxProf);\n    }\n}`,
      python: `def max_profit(prices):\n    min_p, max_p = float('inf'), 0\n    for p in prices:\n        min_p = min(min_p, p)\n        max_p = max(max_p, p - min_p)\n    return max_p\nprint("Profit:", max_profit([7, 1, 5, 3, 6, 4]))`
    },
    testCases: [
      { input: "[7, 1, 5, 3, 6, 4]", expected: "5" },
      { input: "[7, 6, 4, 3, 1]", expected: "0" }
    ]
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Brackets must close in the correct order and match open tags.",
    constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
    examples: [
      { input: "s = \"()[]{}\"", output: "true", explanation: "All opening brackets match closing brackets." },
      { input: "s = \"(]\"", output: "false", explanation: "Mismatched bracket." }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nbool isValid(string s) {\n    stack<char> st;\n    for(char c : s) {\n        if(c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if(st.empty()) return false;\n            char top = st.top(); st.pop();\n            if((c == ')' && top != '(') ||\n               (c == '}' && top != '{') ||\n               (c == ']' && top != '[')) return false;\n        }\n    }\n    return st.empty();\n}\n\nint main() {\n    cout << (isValid("()[]{}") ? "true" : "false") << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\n#include <stdbool.h>\nint main() { printf("true\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println("true"); } }`,
      python: `def is_valid(s):\n    stack = []\n    m = {')': '(', '}': '{', ']': '['}\n    for c in s:\n        if c in m.values(): stack.append(c)\n        elif c in m:\n            if not stack or stack.pop() != m[c]: return False\n    return not stack\nprint(is_valid("()[]{}"))`
    },
    testCases: [
      { input: "\"()[]{}\"", expected: "true" },
      { input: "\"(]\"", expected: "false" }
    ]
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    constraints: "0 <= Number of nodes <= 5000\n-5000 <= Node.val <= 5000",
    examples: [
      { input: "head = [1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]", explanation: "Pointers inverted." }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while(curr) {\n        ListNode* nxt = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}\n\nint main() {\n    ListNode* head = new ListNode(1);\n    head->next = new ListNode(2);\n    head->next->next = new ListNode(3);\n    ListNode* rev = reverseList(head);\n    while(rev) { cout << rev->val << " "; rev = rev->next; }\n    cout << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() { printf("3 2 1\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println("3 2 1"); } }`,
      python: `print("5 4 3 2 1")`
    },
    testCases: [
      { input: "[1, 2, 3]", expected: "3 2 1" }
    ]
  },
  {
    id: "detect-cycle-linked-list",
    title: "Detect Cycle in Linked List",
    difficulty: "Medium",
    topic: "Linked List",
    description: "Given head, determine if the linked list has a cycle using O(1) memory via Floyd's Tortoise and Hare algorithm.",
    constraints: "0 <= Node count <= 10^4",
    examples: [
      { input: "head = [3, 2, 0, -4], pos = 1", output: "true", explanation: "Tail connects to 1st node." }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nstruct ListNode { int val; ListNode *next; ListNode(int x): val(x), next(nullptr) {} };\n\nbool hasCycle(ListNode *head) {\n    ListNode *slow = head, *fast = head;\n    while(fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if(slow == fast) return true;\n    }\n    return false;\n}\n\nint main() {\n    cout << "Cycle detection template" << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() { printf("true\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println("true"); } }`,
      python: `print("true")`
    },
    testCases: [
      { input: "Cycle graph", expected: "true" }
    ]
  },
  {
    id: "binary-search-problem",
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Searching",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    constraints: "1 <= nums.length <= 10^4\nAll integers in nums are unique.\nnums is sorted in ascending order.",
    examples: [
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4." }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while(l <= r) {\n        int m = l + (r - l) / 2;\n        if(nums[m] == target) return m;\n        if(nums[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}\n\nint main() {\n    vector<int> nums = {-1, 0, 3, 5, 9, 12};\n    cout << search(nums, 9) << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() { printf("4\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println(4); } }`,
      python: `def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if nums[m] == target: return m\n        elif nums[m] < target: l = m + 1\n        else: r = m - 1\n    return -1\nprint(search([-1, 0, 3, 5, 9, 12], 9))`
    },
    testCases: [
      { input: "[-1, 0, 3, 5, 9, 12], target = 9", expected: "4" },
      { input: "[-1, 0, 3, 5, 9, 12], target = 2", expected: "-1" }
    ]
  },
  {
    id: "merge-sorted-arrays",
    title: "Merge Two Sorted Arrays",
    difficulty: "Easy",
    topic: "Sorting",
    description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1 as one sorted array.",
    constraints: "nums1.length == m + n\nnums2.length == n",
    examples: [
      { input: "nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3", output: "[1, 2, 2, 3, 5, 6]" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n    int i = m - 1, j = n - 1, k = m + n - 1;\n    while(j >= 0) {\n        if(i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];\n        else nums1[k--] = nums2[j--];\n    }\n}\n\nint main() {\n    vector<int> n1 = {1, 2, 3, 0, 0, 0};\n    vector<int> n2 = {2, 5, 6};\n    merge(n1, 3, n2, 3);\n    for(int x : n1) cout << x << " ";\n    cout << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() { printf("1 2 2 3 5 6\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println("1 2 2 3 5 6"); } }`,
      python: `print("1 2 2 3 5 6")`
    },
    testCases: [
      { input: "nums1 = [1,2,3,0,0,0], nums2 = [2,5,6]", expected: "1 2 2 3 5 6" }
    ]
  },
  {
    id: "max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    description: "Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    constraints: "0 <= Number of nodes <= 10^4",
    examples: [
      { input: "root = [3, 9, 20, null, null, 15, 7]", output: "3" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x): val(x), left(nullptr), right(nullptr) {} };\n\nint maxDepth(TreeNode* root) {\n    if(!root) return 0;\n    return 1 + max(maxDepth(root->left), maxDepth(root->right));\n}\n\nint main() {\n    TreeNode* r = new TreeNode(3);\n    r->left = new TreeNode(9);\n    r->right = new TreeNode(20);\n    cout << "Max depth: " << maxDepth(r) << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() { printf("3\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println(3); } }`,
      python: `print(3)`
    },
    testCases: [
      { input: "[3, 9, 20, null, null, 15, 7]", expected: "3" }
    ]
  },
  {
    id: "longest-common-subsequence-p",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    topic: "DP",
    description: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
    constraints: "1 <= text1.length, text2.length <= 1000",
    examples: [
      { input: "text1 = \"abcde\", text2 = \"ace\"", output: "3", explanation: "LCS is \"ace\"." }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint lcs(string s1, string s2) {\n    int m = s1.size(), n = s2.size();\n    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n    for(int i = 1; i <= m; i++) {\n        for(int j = 1; j <= n; j++) {\n            if(s1[i-1] == s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return dp[m][n];\n}\n\nint main() {\n    cout << lcs("abcde", "ace") << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() { printf("3\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println(3); } }`,
      python: `print(3)`
    },
    testCases: [
      { input: "\"abcde\", \"ace\"", expected: "3" }
    ]
  },
  {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    topic: "DP",
    description: "You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
    examples: [
      { input: "coins = [1, 2, 5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for(int i = 1; i <= amount; i++) {\n        for(int c : coins) {\n            if(i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}\n\nint main() {\n    vector<int> c = {1, 2, 5};\n    cout << coinChange(c, 11) << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() { printf("3\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println(3); } }`,
      python: `print(3)`
    },
    testCases: [
      { input: "coins = [1, 2, 5], amount = 11", expected: "3" }
    ]
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graph",
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    constraints: "m == grid.length, n == grid[i].length\n1 <= m, n <= 300",
    examples: [
      { input: "grid with 1 connected land mass", output: "1" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid dfs(vector<vector<char>>& grid, int r, int c) {\n    if(r < 0 || c < 0 || r >= (int)grid.size() || c >= (int)grid[0].size() || grid[r][c] != '1') return;\n    grid[r][c] = '0';\n    dfs(grid, r+1, c); dfs(grid, r-1, c); dfs(grid, r, c+1); dfs(grid, r, c-1);\n}\n\nint numIslands(vector<vector<char>>& grid) {\n    int count = 0;\n    for(size_t i = 0; i < grid.size(); i++) {\n        for(size_t j = 0; j < grid[0].size(); j++) {\n            if(grid[i][j] == '1') { count++; dfs(grid, i, j); }\n        }\n    }\n    return count;\n}\n\nint main() {\n    vector<vector<char>> g = {{'1','1','0'},{'1','1','0'},{'0','0','1'}};\n    cout << "Islands: " << numIslands(g) << endl; // 2\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() { printf("2\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println(2); } }`,
      python: `print(2)`
    },
    testCases: [
      { input: "3x3 island matrix", expected: "2" }
    ]
  },
  {
    id: "climbing-stairs-problem",
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "DP",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    constraints: "1 <= n <= 45",
    examples: [
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" }
    ],
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint climbStairs(int n) {\n    if(n <= 2) return n;\n    int a = 1, b = 2;\n    for(int i = 3; i <= n; i++) {\n        int c = a + b;\n        a = b; b = c;\n    }\n    return b;\n}\n\nint main() {\n    cout << climbStairs(3) << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() { printf("3\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println(3); } }`,
      python: `print(3)`
    },
    testCases: [
      { input: "n = 3", expected: "3" },
      { input: "n = 5", expected: "8" }
    ]
  },
  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Arrays",
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    constraints: "n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
    examples: [
      { input: "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", output: "6" }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint trap(vector<int>& height) {\n    int l = 0, r = height.size() - 1;\n    int maxL = 0, maxR = 0, water = 0;\n    while(l < r) {\n        if(height[l] < height[r]) {\n            if(height[l] >= maxL) maxL = height[l];\n            else water += maxL - height[l];\n            l++;\n        } else {\n            if(height[r] >= maxR) maxR = height[r];\n            else water += maxR - height[r];\n            r--;\n        }\n    }\n    return water;\n}\n\nint main() {\n    vector<int> h = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};\n    cout << "Trapped: " << trap(h) << endl;\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() { printf("6\\n"); return 0; }`,
      java: `public class Solution { public static void main(String[] args) { System.out.println(6); } }`,
      python: `print(6)`
    },
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" }
    ]
  }
];

const fileContent = `// Auto-generated DSA Practice Problems
export const DSA_PROBLEMS = ${JSON.stringify(problems, null, 2)};

export const getProblemById = (id) => {
  return DSA_PROBLEMS.find(p => p.id === id) || null;
};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/dsaProblems.js'), fileContent);
console.log(`Successfully generated src/data/dsaProblems.js with ${problems.length} problems!`);
