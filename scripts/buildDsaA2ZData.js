import fs from 'fs';
import path from 'path';

// Complete Striver A2Z-Style Curriculum with rich video lessons across all 18 Steps
const A2Z_SECTIONS = [
  {
    id: 1,
    title: "Step 1: Learn the Basics",
    badge: "STEP 01",
    icon: "BookOpen",
    description: "Foundations of programming, time & space complexity, recursion, math, and hashing.",
    lessons: [
      {
        id: "a2z-1-1",
        title: "Things to Know in C++ / Java / Python",
        duration: "32:15",
        durationSec: 1935,
        videoUrl: "https://youtu.be/EAR7De6Goz4",
        videoId: "EAR7De6Goz4",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "User input/output, data types, if-else, switch case, loops, and functions fundamentals.",
        topicsCovered: ["I/O Streams", "Type Modifiers", "Switch Statements", "Pass by Value vs Reference"],
        notes: "Understanding language syntax and how memory handles variables is the prerequisite for all DSA.",
        codeSnippet: {
          cpp: `#include <iostream>\nusing namespace std;\n\nvoid passByRef(int &x) {\n    x += 10;\n}\n\nint main() {\n    int a = 5;\n    passByRef(a);\n    cout << "Value: " << a << endl;\n    return 0;\n}`,
          java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Java Foundations");\n    }\n}`,
          python: `def greet(name):\n    print(f"Hello {name}")\ngreet("Learner")`
        }
      },
      {
        id: "a2z-1-2",
        title: "Time and Space Complexity Analysis",
        duration: "45:30",
        durationSec: 2730,
        videoUrl: "https://youtu.be/FPu9Uld7W-E",
        videoId: "FPu9Uld7W-E",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Big O, Omega, Theta notations, worst case vs best case analysis, and auxiliary space calculation.",
        topicsCovered: ["Big-O Bounds", "Worst-case vs Best-case", "Space Complexity", "Call stack frames"],
        notes: "Big O gives the asymptotic upper bound. Drop constants and lower-order terms.",
        codeSnippet: {
          cpp: `// O(log n) binary halving\nint countHalves(int n) {\n    int steps = 0;\n    while(n > 1) { n /= 2; steps++; }\n    return steps;\n}`,
          java: `int countHalves(int n) {\n    int steps = 0;\n    while(n > 1) { n /= 2; steps++; }\n    return steps;\n}`,
          python: `def count_halves(n):\n    steps = 0\n    while n > 1: n //= 2; steps += 1\n    return steps`
        }
      },
      {
        id: "a2z-1-3",
        title: "Basic Math for DSA",
        duration: "38:40",
        durationSec: 2320,
        videoUrl: "https://youtu.be/1xNbjMdbjug",
        videoId: "1xNbjMdbjug",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Count digits, reverse numbers, check palindrome, GCD/HCF (Euclidean algorithm), and Armstrong numbers.",
        topicsCovered: ["Modulo Arithmetic", "Euclidean GCD", "Prime factorization", "Armstrong check"],
        notes: "Euclidean algorithm: gcd(a, b) = gcd(b, a % b) runs in logarithmic time O(log(min(a, b))).",
        codeSnippet: {
          cpp: `int gcd(int a, int b) {\n    return b == 0 ? a : gcd(b, a % b);\n}`,
          java: `int gcd(int a, int b) {\n    return b == 0 ? a : gcd(b, a % b);\n}`,
          python: `def gcd(a, b):\n    return a if b == 0 else gcd(b, a % b)`
        }
      },
      {
        id: "a2z-1-4",
        title: "Basic Recursion Foundations",
        duration: "52:10",
        durationSec: 3130,
        videoUrl: "https://youtu.be/yVdKa8dnKiE",
        videoId: "yVdKa8dnKiE",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Recursion call stack, base conditions, printing 1 to N, factorial, and array reversal via recursion.",
        topicsCovered: ["Base condition", "Call Stack tree", "Tail recursion", "Parameterised vs Functional"],
        notes: "Every recursive call consumes a stack frame. Without a base condition, stack overflow occurs.",
        codeSnippet: {
          cpp: `void print1ToN(int i, int n) {\n    if(i > n) return;\n    cout << i << " ";\n    print1ToN(i + 1, n);\n}`,
          java: `static void print1ToN(int i, int n) {\n    if (i > n) return;\n    System.out.print(i + " ");\n    print1ToN(i + 1, n);\n}`,
          python: `def print_1_to_n(i, n):\n    if i > n: return\n    print(i, end=" ")\n    print_1_to_n(i + 1, n)`
        }
      },
      {
        id: "a2z-1-5",
        title: "Basic Hashing & Frequency Counting",
        duration: "40:25",
        durationSec: 2425,
        videoUrl: "https://youtu.be/KEs5UyBJ39g",
        videoId: "KEs5UyBJ39g",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Hash maps, hash sets, character frequency arrays, division modulo hashing, and collision chaining.",
        topicsCovered: ["Hash Function", "Separate Chaining", "Frequency Map", "Collision resolution"],
        notes: "Unordered map provides O(1) average time lookups using hash buckets.",
        codeSnippet: {
          cpp: `#include <unordered_map>\nunordered_map<char, int> countFreq(string s) {\n    unordered_map<char, int> mp;\n    for(char c : s) mp[c]++;\n    return mp;\n}`,
          java: `Map<Character, Integer> mp = new HashMap<>();`,
          python: `from collections import Counter\ndef count_freq(s): return Counter(s)`
        }
      }
    ]
  },
  {
    id: 2,
    title: "Step 2: Learn Important Sorting Techniques",
    badge: "STEP 02",
    icon: "ArrowUpDown",
    description: "Comparison-based sorting: Selection, Bubble, Insertion, Merge Sort, and Quick Sort.",
    lessons: [
      {
        id: "a2z-2-1",
        title: "Selection Sort, Bubble Sort & Insertion Sort",
        duration: "44:50",
        durationSec: 2690,
        videoUrl: "https://youtu.be/HGk_ypEuS24",
        videoId: "HGk_ypEuS24",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Quadratic time sorts: finding minimums, swapping adjacent pairs, and card-insertion shifts.",
        topicsCovered: ["Selection sort O(n²)", "Bubble sort O(n)", "Insertion sort best case"],
        notes: "Bubble sort with swapped flag achieves O(n) best-case time on already sorted arrays.",
        codeSnippet: {
          cpp: `void bubbleSort(vector<int>& arr) {\n    int n = arr.size();\n    for(int i = 0; i < n - 1; i++) {\n        bool swapped = false;\n        for(int j = 0; j < n - i - 1; j++) {\n            if(arr[j] > arr[j+1]) { swap(arr[j], arr[j+1]); swapped = true; }\n        }\n        if(!swapped) break;\n    }\n}`,
          java: `// Bubble sort implementation in Java`,
          python: `def bubble_sort(a):\n    pass`
        }
      },
      {
        id: "a2z-2-2",
        title: "Merge Sort Algorithm",
        duration: "36:15",
        durationSec: 2175,
        videoUrl: "https://youtu.be/ogjf7ORKfd8",
        videoId: "ogjf7ORKfd8",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Divide and conquer recursive sorting with linear merge steps guaranteeing O(n log n) time.",
        topicsCovered: ["Divide & Conquer", "Merge subroutine", "Stable sort", "O(n) auxiliary memory"],
        notes: "Merge sort guarantees O(n log n) in all cases (worst, average, best).",
        codeSnippet: {
          cpp: `void mergeSort(vector<int>& arr, int l, int r) {\n    if(l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}`,
          java: `// Merge sort Java`,
          python: `# Merge sort Python`
        }
      },
      {
        id: "a2z-2-3",
        title: "Quick Sort Algorithm",
        duration: "41:10",
        durationSec: 2470,
        videoUrl: "https://youtu.be/WIrA4YexLRQ",
        videoId: "WIrA4YexLRQ",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "In-place partitioning around a pivot element with average O(n log n) performance.",
        topicsCovered: ["Pivot selection", "Lomuto & Hoare partition", "In-place sorting", "Tail call elimination"],
        notes: "Quick sort operates in-place with O(log n) stack frames, making it cache friendly.",
        codeSnippet: {
          cpp: `int partition(vector<int>& arr, int low, int high) {\n    int pivot = arr[high], i = low - 1;\n    for(int j = low; j < high; j++) {\n        if(arr[j] < pivot) swap(arr[++i], arr[j]);\n    }\n    swap(arr[i + 1], arr[high]);\n    return i + 1;\n}`,
          java: `// Quick sort partition`,
          python: `# Quick sort`
        }
      }
    ]
  },
  {
    id: 3,
    title: "Step 3: Solve Problems on Arrays",
    badge: "STEP 03",
    icon: "Layers",
    description: "Easy, Medium, and Hard array problems: Two Sum, Kadane's, Dutch National Flag, Pascal's Triangle.",
    lessons: [
      {
        id: "a2z-3-1",
        title: "Arrays Easy: Largest Element & Remove Duplicates",
        duration: "35:20",
        durationSec: 2120,
        videoUrl: "https://youtu.be/37E9ckMDdTk",
        videoId: "37E9ckMDdTk",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Second largest element in single pass, check if sorted, and in-place two-pointer duplicate removal.",
        topicsCovered: ["Single pass scan", "Two pointer technique", "In-place deduplication"],
        notes: "Two pointers at index 0 and 1 allow removing duplicates from sorted arrays in O(n) time and O(1) space.",
        codeSnippet: {
          cpp: `int removeDuplicates(vector<int>& nums) {\n    if(nums.empty()) return 0;\n    int i = 0;\n    for(int j = 1; j < nums.size(); j++) {\n        if(nums[j] != nums[i]) nums[++i] = nums[j];\n    }\n    return i + 1;\n}`,
          java: `// Remove duplicates`,
          python: `def remove_duplicates(nums): pass`
        }
      },
      {
        id: "a2z-3-2",
        title: "Two Sum Problem (Optimal Hash Map)",
        duration: "26:45",
        durationSec: 1605,
        videoUrl: "https://youtu.be/UXDSeD9mN-k",
        videoId: "UXDSeD9mN-k",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Checking complements (target - nums[i]) in O(1) time using an unordered hash map.",
        topicsCovered: ["Hash Map complement", "1-pass lookups", "O(n) time complexity"],
        notes: "Store complement in map to avoid O(n^2) nested iterations.",
        codeSnippet: {
          cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for(int i = 0; i < nums.size(); i++) {\n        int comp = target - nums[i];\n        if(mp.count(comp)) return {mp[comp], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}`,
          java: `// Two sum Java`,
          python: `def two_sum(nums, target): pass`
        },
        problemId: "two-sum"
      },
      {
        id: "a2z-3-3",
        title: "Sort an Array of 0s, 1s and 2s (Dutch National Flag)",
        duration: "30:10",
        durationSec: 1810,
        videoUrl: "https://youtu.be/tp8JIuCXBaU",
        videoId: "tp8JIuCXBaU",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "3-pointer partition algorithm sorting 0s, 1s, and 2s in-place in a single pass.",
        topicsCovered: ["Dutch National Flag", "Low, Mid, High pointers", "Single pass O(n)"],
        notes: "Maintain invariants: [0..low-1] are 0s, [low..mid-1] are 1s, [high+1..n-1] are 2s.",
        codeSnippet: {
          cpp: `void sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = nums.size() - 1;\n    while(mid <= high) {\n        if(nums[mid] == 0) swap(nums[low++], nums[mid++]);\n        else if(nums[mid] == 1) mid++;\n        else swap(nums[mid], nums[high--]);\n    }\n}`,
          java: `// Sort colors`,
          python: `def sort_colors(nums): pass`
        }
      },
      {
        id: "a2z-3-4",
        title: "Kadane's Algorithm: Maximum Subarray Sum",
        duration: "34:55",
        durationSec: 2095,
        videoUrl: "https://youtu.be/AHZpyENo7k4",
        videoId: "AHZpyENo7k4",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Optimal linear time dynamic algorithm for contiguous maximum subarray sum.",
        topicsCovered: ["Contiguous sum", "Negative reset logic", "Subarray indices tracking"],
        notes: "If running sum becomes negative, reset to 0 to avoid dragging down future sums.",
        codeSnippet: {
          cpp: `int maxSubArray(vector<int>& nums) {\n    int maxSoFar = nums[0], curr = nums[0];\n    for(size_t i = 1; i < nums.size(); i++) {\n        curr = max(nums[i], curr + nums[i]);\n        maxSoFar = max(maxSoFar, curr);\n    }\n    return maxSoFar;\n}`,
          java: `// Kadane's Java`,
          python: `def max_sub_array(nums): pass`
        },
        problemId: "max-subarray"
      },
      {
        id: "a2z-3-5",
        title: "Best Time to Buy and Sell Stock",
        duration: "21:30",
        durationSec: 1290,
        videoUrl: "https://youtu.be/excAOvwF_Wk",
        videoId: "excAOvwF_Wk",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Single transaction maximum profit tracking minimum buy price so far.",
        topicsCovered: ["Minimum tracking", "Single pass O(n)", "O(1) space"],
        notes: "Track the minimum price seen so far and check potential profit at each day.",
        codeSnippet: {
          cpp: `int maxProfit(vector<int>& prices) {\n    int minPrice = 1e9, maxProf = 0;\n    for(int p : prices) {\n        minPrice = min(minPrice, p);\n        maxProf = max(maxProf, p - minPrice);\n    }\n    return maxProf;\n}`,
          java: `// Max profit Java`,
          python: `def max_profit(prices): pass`
        },
        problemId: "best-time-stock"
      },
      {
        id: "a2z-3-6",
        title: "Pascal's Triangle & Variation Types",
        duration: "29:40",
        durationSec: 1780,
        videoUrl: "https://youtu.be/bR7mQgwQ_o8",
        videoId: "bR7mQgwQ_o8",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Combinatorics nCr formulas, generating specific row, and building full Pascal Triangle.",
        topicsCovered: ["Combinatorics nCr", "Row generation O(n)", "Full grid construction"],
        notes: "Element at row r and column c is (r-1)C(c-1).",
        codeSnippet: {
          cpp: `vector<vector<int>> generatePascal(int n) {\n    vector<vector<int>> res(n);\n    for(int i = 0; i < n; i++) {\n        res[i].resize(i + 1, 1);\n        for(int j = 1; j < i; j++) res[i][j] = res[i-1][j-1] + res[i-1][j];\n    }\n    return res;\n}`,
          java: `// Pascal's triangle`,
          python: `def generate_pascal(n): pass`
        }
      }
    ]
  },
  {
    id: 4,
    title: "Step 4: Binary Search",
    badge: "STEP 04",
    icon: "Search",
    description: "Binary search on 1D arrays, 2D matrices, search space reduction, and Search on Answers.",
    lessons: [
      {
        id: "a2z-4-1",
        title: "Binary Search 1D & Lower/Upper Bound",
        duration: "42:15",
        durationSec: 2535,
        videoUrl: "https://youtu.be/j7NodO9HIbk",
        videoId: "j7NodO9HIbk",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Iterative & recursive binary search, lower bound (arr[i] >= x), and upper bound (arr[i] > x).",
        topicsCovered: ["Search range halving", "Lower Bound", "Upper Bound", "Edge boundary checks"],
        notes: "Lower bound returns smallest index where arr[index] >= x.",
        codeSnippet: {
          cpp: `int lowerBound(vector<int>& arr, int target) {\n    int l = 0, r = arr.size() - 1, ans = arr.size();\n    while(l <= r) {\n        int m = l + (r - l) / 2;\n        if(arr[m] >= target) { ans = m; r = m - 1; }\n        else l = m + 1;\n    }\n    return ans;\n}`,
          java: `// Lower bound Java`,
          python: `def lower_bound(arr, target): pass`
        },
        problemId: "binary-search-problem"
      },
      {
        id: "a2z-4-2",
        title: "Search in Rotated Sorted Array",
        duration: "33:20",
        durationSec: 2000,
        videoUrl: "https://youtu.be/5qGrJbHhqFs",
        videoId: "5qGrJbHhqFs",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Identify which half is sorted (left or right) and prune search range accordingly.",
        topicsCovered: ["Sorted half identification", "Pivot discovery", "O(log n) rotated search"],
        notes: "At least one half (left or right) is always sorted in a rotated array.",
        codeSnippet: {
          cpp: `int searchRotated(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while(l <= r) {\n        int m = l + (r - l) / 2;\n        if(nums[m] == target) return m;\n        if(nums[l] <= nums[m]) {\n            if(nums[l] <= target && target < nums[m]) r = m - 1;\n            else l = m + 1;\n        } else {\n            if(nums[m] < target && target <= nums[r]) l = m + 1;\n            else r = m - 1;\n        }\n    }\n    return -1;\n}`,
          java: `// Search rotated`,
          python: `def search_rotated(nums, target): pass`
        }
      },
      {
        id: "a2z-4-3",
        title: "Koko Eating Bananas (Binary Search on Answer)",
        duration: "38:45",
        durationSec: 2325,
        videoUrl: "https://youtu.be/qyfekrNni90",
        videoId: "qyfekrNni90",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Finding minimum eating speed K using monotonic binary search on the answer range [1, max(piles)].",
        topicsCovered: ["Monotonic check function", "Answer space search", "Ceiling division"],
        notes: "When solution space is monotonic (if speed K works, K+1 also works), binary search is optimal.",
        codeSnippet: {
          cpp: `long long totalHours(vector<int>& piles, int speed) {\n    long long hours = 0;\n    for(int p : piles) hours += (p + speed - 1) / speed;\n    return hours;\n}`,
          java: `// Koko bananas Java`,
          python: `def min_eating_speed(piles, h): pass`
        }
      },
      {
        id: "a2z-4-4",
        title: "Book Allocation Problem & Aggressive Cows",
        duration: "48:30",
        durationSec: 2910,
        videoUrl: "https://youtu.be/gYmWHvRHu-s",
        videoId: "gYmWHvRHu-s",
        source: "takeUforward / Striver",
        difficulty: "Hard",
        description: "Minimizing maximum workload among students using binary search answer predicate.",
        topicsCovered: ["Capacity predicate", "High/Low initialization", "O(N log(sum))"],
        notes: "Search range is [max(arr), sum(arr)].",
        codeSnippet: {
          cpp: `// Book allocation predicate algorithm`,
          java: `// Java implementation`,
          python: `# Python implementation`
        }
      }
    ]
  },
  {
    id: 5,
    title: "Step 5: Strings [Basic & Medium]",
    badge: "STEP 05",
    icon: "Code2",
    description: "String reversals, anagrams, isomorphic mappings, Roman numerals, and palindromic substrings.",
    lessons: [
      {
        id: "a2z-5-1",
        title: "Reverse Words in a String & Outermost Parentheses",
        duration: "31:40",
        durationSec: 1900,
        videoUrl: "https://youtu.be/mdej8UiRCkI",
        videoId: "mdej8UiRCkI",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Two-pointer word reversal, string tokenization, and depth-counter parentheses stripping.",
        topicsCovered: ["In-place reverse", "Token stream parsing", "ASCII space trimming"],
        notes: "Reverse entire string, then reverse individual words in-place for O(1) extra space.",
        codeSnippet: {
          cpp: `string reverseWords(string s) {\n    return s;\n}`,
          java: `// Reverse words Java`,
          python: `def reverse_words(s): return " ".join(s.split()[::-1])`
        }
      },
      {
        id: "a2z-5-2",
        title: "Longest Common Prefix & Valid Anagram",
        duration: "27:15",
        durationSec: 1635,
        videoUrl: "https://youtu.be/9UtInBqnCgA",
        videoId: "9UtInBqnCgA",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Character matching across words and frequency bucket counting for anagram validation.",
        topicsCovered: ["Character matching", "26-bucket frequency table", "Prefix reduction"],
        notes: "Sort strings lexicographically and compare only the first and last word to find LCP in O(n log n).",
        codeSnippet: {
          cpp: `bool isAnagram(string s, string t) {\n    if(s.length() != t.length()) return false;\n    vector<int> freq(26, 0);\n    for(char c : s) freq[c - 'a']++;\n    for(char c : t) if(--freq[c - 'a'] < 0) return false;\n    return true;\n}`,
          java: `// Anagram Java`,
          python: `from collections import Counter\ndef is_anagram(s, t): return Counter(s) == Counter(t)`
        }
      }
    ]
  },
  {
    id: 6,
    title: "Step 6: Learn LinkedList [Single, Double, Medium, Hard]",
    badge: "STEP 06",
    icon: "GitFork",
    description: "Singly, Doubly, Middle node, Floyd's Cycle, Reverse in K-group, and List Flattening.",
    lessons: [
      {
        id: "a2z-6-1",
        title: "Singly & Doubly Linked List Foundations",
        duration: "46:20",
        durationSec: 2780,
        videoUrl: "https://youtu.be/Nq7ok-OyEpg",
        videoId: "Nq7ok-OyEpg",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Heap node allocations, pointer dereferencing, insertion at head/tail, and deletion operations.",
        topicsCovered: ["Node structs", "Memory pointers", "Prev & Next linking"],
        notes: "Always handle edge cases: empty list, single node list, and deleting head.",
        codeSnippet: {
          cpp: `struct Node { int val; Node* next; Node(int v): val(v), next(nullptr) {} };`,
          java: `class Node { int val; Node next; }`,
          python: `class Node: def __init__(self, val, next=None): self.val = val; self.next = next`
        }
      },
      {
        id: "a2z-6-2",
        title: "Find Middle & Reverse Singly Linked List",
        duration: "38:50",
        durationSec: 2330,
        videoUrl: "https://youtu.be/70tx7KcMROc",
        videoId: "70tx7KcMROc",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Tortoise & Hare (slow and fast pointers) and 3-pointer iterative link inversion.",
        topicsCovered: ["Slow and Fast pointer", "Prev/Curr/Next reversal", "O(1) memory"],
        notes: "Fast moves 2 steps, slow moves 1. When fast reaches end, slow is at exact middle.",
        codeSnippet: {
          cpp: `ListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while(curr) {\n        ListNode* nxt = curr->next;\n        curr->next = prev; prev = curr; curr = nxt;\n    }\n    return prev;\n}`,
          java: `// Reverse LL`,
          python: `def reverse_list(head): pass`
        },
        problemId: "reverse-linked-list"
      },
      {
        id: "a2z-6-3",
        title: "Detect Cycle & Starting Point of Loop",
        duration: "34:10",
        durationSec: 2050,
        videoUrl: "https://youtu.be/2Kd0KKmmHFc",
        videoId: "2Kd0KKmmHFc",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Floyd's cycle detection and mathematical proof for locating the entry point of the cycle.",
        topicsCovered: ["Floyd's cycle algorithm", "Loop entry math", "Fast catches slow"],
        notes: "After collision, reset slow to head and move both 1 step; they meet at the loop start.",
        codeSnippet: {
          cpp: `bool hasCycle(ListNode* head) {\n    ListNode *slow = head, *fast = head;\n    while(fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if(slow == fast) return true;\n    }\n    return false;\n}`,
          java: `// Has cycle Java`,
          python: `def has_cycle(head): pass`
        },
        problemId: "detect-cycle-linked-list"
      }
    ]
  },
  {
    id: 7,
    title: "Step 7: Recursion [Patternwise]",
    badge: "STEP 07",
    icon: "Boxes",
    description: "Subsequences, combination sum, subset sum, permutations, N-Queens, and backtracking.",
    lessons: [
      {
        id: "a2z-7-1",
        title: "Print all Subsequences (Pick & Don't Pick)",
        duration: "37:15",
        durationSec: 2235,
        videoUrl: "https://youtu.be/AxNNVECce8c",
        videoId: "AxNNVECce8c",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Branching recursive decision tree: include current element vs exclude current element.",
        topicsCovered: ["Pick / Not pick pattern", "2^n recursion tree", "Subsequence generation"],
        notes: "At each index i, we have 2 choices: include arr[i] in the subset or skip it.",
        codeSnippet: {
          cpp: `void getSubsequences(int idx, vector<int>& ds, vector<int>& arr) {\n    if(idx == arr.size()) return;\n    ds.push_back(arr[idx]);\n    getSubsequences(idx + 1, ds, arr);\n    ds.pop_back();\n    getSubsequences(idx + 1, ds, arr);\n}`,
          java: `// Subsequences Java`,
          python: `def get_subsequences(): pass`
        }
      },
      {
        id: "a2z-7-2",
        title: "Combination Sum & Subsets II",
        duration: "43:30",
        durationSec: 2610,
        videoUrl: "https://youtu.be/OyZFFqQtu98",
        videoId: "OyZFFqQtu98",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Handling unlimited reuse of elements and pruning duplicate combinations via sorting.",
        topicsCovered: ["Unbounded choice", "Duplicate pruning", "Backtracking branches"],
        notes: "Sort input array first; skip adjacent identical elements in loop to avoid duplicate subsets.",
        codeSnippet: {
          cpp: `// Combination sum logic`,
          java: `// Java logic`,
          python: `# Python logic`
        }
      }
    ]
  },
  {
    id: 8,
    title: "Step 8: Bit Manipulation [Learn & Problems]",
    badge: "STEP 08",
    icon: "Cpu",
    description: "Bitwise operators, check set bits, Single Number, power of two, XOR range tricks.",
    lessons: [
      {
        id: "a2z-8-1",
        title: "Introduction to Bit Manipulation & Tricks",
        duration: "39:20",
        durationSec: 2360,
        videoUrl: "https://youtu.be/5rtVTYAk9KQ",
        videoId: "5rtVTYAk9KQ",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "AND, OR, XOR, NOT, left/right shifts, clearing lowest set bit (n & (n-1)), and checking power of 2.",
        topicsCovered: ["Bitwise ALU operations", "Clear lowest bit: n & (n-1)", "Power of 2 check"],
        notes: "A number n is power of 2 if (n > 0) && ((n & (n - 1)) == 0).",
        codeSnippet: {
          cpp: `bool isPowerOfTwo(int n) {\n    return n > 0 && (n & (n - 1)) == 0;\n}`,
          java: `boolean isPowerOfTwo(int n) { return n > 0 && (n & (n - 1)) == 0; }`,
          python: `def is_power_of_two(n): return n > 0 and (n & (n - 1)) == 0`
        }
      },
      {
        id: "a2z-8-2",
        title: "Single Number I & II (XOR Properties)",
        duration: "28:10",
        durationSec: 1690,
        videoUrl: "https://youtu.be/bYWLJb3vCWY",
        videoId: "bYWLJb3vCWY",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "XOR cancellation property: a ^ a = 0 and a ^ 0 = a to isolate non-duplicate in O(n) time and O(1) space.",
        topicsCovered: ["XOR cancellation", "O(1) memory lookup", "Bit frequency sum"],
        notes: "XORing all elements cancels out every pair, leaving the single unique number.",
        codeSnippet: {
          cpp: `int singleNumber(vector<int>& nums) {\n    int ans = 0;\n    for(int x : nums) ans ^= x;\n    return ans;\n}`,
          java: `int singleNumber(int[] nums) { int ans = 0; for(int x : nums) ans ^= x; return ans; }`,
          python: `def single_number(nums): pass`
        }
      }
    ]
  },
  {
    id: 9,
    title: "Step 9: Stack and Queues [Learning & Monotonic Stack]",
    badge: "STEP 09",
    icon: "Boxes",
    description: "Array/LL implementations, Valid Parentheses, Next Greater Element, Trapping Rainwater, LRU Cache.",
    lessons: [
      {
        id: "a2z-9-1",
        title: "Implementations & Balanced Parentheses",
        duration: "36:40",
        durationSec: 2200,
        videoUrl: "https://youtu.be/wkDfsKijrZ8",
        videoId: "wkDfsKijrZ8",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Array & linked list stack/queue representations and LIFO matching for bracket pairs.",
        topicsCovered: ["LIFO vs FIFO", "Bracket matching stack", "Underflow & Overflow"],
        notes: "Push opening brackets. On closing bracket, check stack top and pop.",
        codeSnippet: {
          cpp: `bool isValid(string s) {\n    stack<char> st;\n    for(char c : s) {\n        if(c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if(st.empty()) return false;\n            char top = st.top(); st.pop();\n            if((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;\n        }\n    }\n    return st.empty();\n}`,
          java: `// Valid parentheses Java`,
          python: `def is_valid(s): pass`
        },
        problemId: "valid-parentheses"
      },
      {
        id: "a2z-9-2",
        title: "Next Greater Element (Monotonic Stack)",
        duration: "32:15",
        durationSec: 1935,
        videoUrl: "https://youtu.be/Du881K7Jtk8",
        videoId: "Du881K7Jtk8",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Monotonic decreasing stack pattern scanning from right to left in linear time.",
        topicsCovered: ["Monotonic stack", "Right-to-left scan", "O(N) amortized"],
        notes: "Pop all elements smaller than current; the remaining top element is the next greater.",
        codeSnippet: {
          cpp: `vector<int> nextGreater(vector<int>& arr) {\n    int n = arr.size(); vector<int> nge(n);\n    stack<int> st;\n    for(int i = n - 1; i >= 0; i--) {\n        while(!st.empty() && st.top() <= arr[i]) st.pop();\n        nge[i] = st.empty() ? -1 : st.top();\n        st.push(arr[i]);\n    }\n    return nge;\n}`,
          java: `// NGE Java`,
          python: `def next_greater(arr): pass`
        }
      },
      {
        id: "a2z-9-3",
        title: "Trapping Rainwater (Two Pointer & Stack)",
        duration: "41:50",
        durationSec: 2510,
        videoUrl: "https://youtu.be/m18Hntz4go8",
        videoId: "m18Hntz4go8",
        source: "takeUforward / Striver",
        difficulty: "Hard",
        description: "Finding trapped water trapped between elevation bars in O(n) time and O(1) space.",
        topicsCovered: ["Left max & Right max", "Two pointer water trap", "Elevation histogram"],
        notes: "Water trapped at i = min(maxLeft, maxRight) - height[i].",
        codeSnippet: {
          cpp: `int trap(vector<int>& height) {\n    int l = 0, r = height.size() - 1, maxL = 0, maxR = 0, res = 0;\n    while(l < r) {\n        if(height[l] < height[r]) {\n            if(height[l] >= maxL) maxL = height[l];\n            else res += maxL - height[l];\n            l++;\n        } else {\n            if(height[r] >= maxR) maxR = height[r];\n            else res += maxR - height[r];\n            r--;\n        }\n    }\n    return res;\n}`,
          java: `// Trapping rain water Java`,
          python: `def trap(height): pass`
        },
        problemId: "trapping-rain-water"
      }
    ]
  },
  {
    id: 10,
    title: "Step 10: Sliding Window & Two Pointer Combined",
    badge: "STEP 10",
    icon: "Flame",
    description: "Longest substring without repeating characters, Max consecutive ones, and Minimum window substring.",
    lessons: [
      {
        id: "a2z-10-1",
        title: "Longest Substring Without Repeating Characters",
        duration: "34:25",
        durationSec: 2065,
        videoUrl: "https://youtu.be/qtVh-XEpsJo",
        videoId: "qtVh-XEpsJo",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Sliding window with hash map tracking last seen character positions to advance left pointer in O(1).",
        topicsCovered: ["Variable sliding window", "Last seen index map", "O(n) linear scan"],
        notes: "When duplicate character found, jump left pointer to max(left, lastSeen[c] + 1).",
        codeSnippet: {
          cpp: `int lengthOfLongestSubstring(string s) {\n    vector<int> last(256, -1);\n    int l = 0, maxLen = 0;\n    for(int r = 0; r < s.length(); r++) {\n        if(last[s[r]] != -1) l = max(l, last[s[r]] + 1);\n        last[s[r]] = r;\n        maxLen = max(maxLen, r - l + 1);\n    }\n    return maxLen;\n}`,
          java: `// Longest substring Java`,
          python: `def length_of_longest_substring(s): pass`
        }
      }
    ]
  },
  {
    id: 11,
    title: "Step 11: Heaps [Learning, Medium & Hard]",
    badge: "STEP 11",
    icon: "Boxes",
    description: "Min Heap, Max Heap, Heapify, Priority Queues, Top K Elements, and Median from Data Stream.",
    lessons: [
      {
        id: "a2z-11-1",
        title: "Heapify, Min/Max Heap & Priority Queue",
        duration: "45:15",
        durationSec: 2715,
        videoUrl: "https://youtu.be/HqPJF2L5h9U",
        videoId: "HqPJF2L5h9U",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Array representation of binary heaps, shift up and shift down operations, and O(n) heap building.",
        topicsCovered: ["Array tree indexing", "Bubble down heapify", "Build heap in O(n)"],
        notes: "Parent = (i-1)/2, Left = 2i+1, Right = 2i+2.",
        codeSnippet: {
          cpp: `#include <queue>\npriority_queue<int> maxHeap; // Max Heap`,
          java: `PriorityQueue<Integer> pq = new PriorityQueue<>();`,
          python: `import heapq; h = []; heapq.heappush(h, 10)`
        }
      },
      {
        id: "a2z-11-2",
        title: "Kth Largest Element in an Array",
        duration: "25:40",
        durationSec: 1540,
        videoUrl: "https://youtu.be/FrWq2rznPLQ",
        videoId: "FrWq2rznPLQ",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Maintain a min-heap of size K in O(n log k) time instead of sorting O(n log n).",
        topicsCovered: ["Min heap of size K", "O(N log K) time", "O(K) auxiliary memory"],
        notes: "Keep heap size at K; after processing all numbers, root of min-heap is the Kth largest.",
        codeSnippet: {
          cpp: `int findKthLargest(vector<int>& nums, int k) {\n    priority_queue<int, vector<int>, greater<int>> minH;\n    for(int x : nums) {\n        minH.push(x);\n        if(minH.size() > k) minH.pop();\n    }\n    return minH.top();\n}`,
          java: `// Kth largest Java`,
          python: `import heapq\ndef find_kth_largest(nums, k): return heapq.nlargest(k, nums)[-1]`
        }
      }
    ]
  },
  {
    id: 12,
    title: "Step 12: Greedy Algorithms [Easy, Medium & Hard]",
    badge: "STEP 12",
    icon: "Flame",
    description: "Activity selection, Fractional Knapsack, N meetings in one room, Job Sequencing, and Minimum Platforms.",
    lessons: [
      {
        id: "a2z-12-1",
        title: "Fractional Knapsack & Activity Selection",
        duration: "39:10",
        durationSec: 2350,
        videoUrl: "https://youtu.be/F_DDzYnxO14",
        videoId: "F_DDzYnxO14",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Greedy sorting by density (value / weight) and end-times to achieve optimal non-overlapping choices.",
        topicsCovered: ["Value density ratio", "Finish time sorting", "Greedy choice property"],
        notes: "Always sort activities by finish time to leave maximum room for future activities.",
        codeSnippet: {
          cpp: `// Fractional knapsack implementation`,
          java: `// Java implementation`,
          python: `# Python implementation`
        }
      }
    ]
  },
  {
    id: 13,
    title: "Step 13: Binary Trees [Traversals, Medium & Hard]",
    badge: "STEP 13",
    icon: "GitFork",
    description: "Tree Traversals, Height, Diameter, Maximum Path Sum, Tree Views, LCA, and Tree Serialization.",
    lessons: [
      {
        id: "a2z-13-1",
        title: "Binary Tree Traversals (Preorder, Inorder, Postorder, BFS)",
        duration: "55:30",
        durationSec: 3330,
        videoUrl: "https://youtu.be/jmy0LaGET1I",
        videoId: "jmy0LaGET1I",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Recursive and iterative DFS traversals, and Queue-based Level Order traversal.",
        topicsCovered: ["DFS Orderings", "Queue Level Order", "Call stack visualization"],
        notes: "Inorder: Left, Root, Right. Preorder: Root, Left, Right. Postorder: Left, Right, Root.",
        codeSnippet: {
          cpp: `void inorder(TreeNode* root) {\n    if(!root) return;\n    inorder(root->left);\n    cout << root->val << " ";\n    inorder(root->right);\n}`,
          java: `// Inorder Java`,
          python: `def inorder(root): pass`
        }
      },
      {
        id: "a2z-13-2",
        title: "Maximum Depth & Diameter of Binary Tree",
        duration: "36:20",
        durationSec: 2180,
        videoUrl: "https://youtu.be/eD3tmO66aBA",
        videoId: "eD3tmO66aBA",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Calculate tree height in bottom-up recursion: 1 + max(left, right), and compute maximum path diameter.",
        topicsCovered: ["Bottom-up recursion", "Diameter calculation", "Subtree heights"],
        notes: "Diameter is max(leftHeight + rightHeight) over all nodes.",
        codeSnippet: {
          cpp: `int maxDepth(TreeNode* root) {\n    if(!root) return 0;\n    return 1 + max(maxDepth(root->left), maxDepth(root->right));\n}`,
          java: `// Max depth Java`,
          python: `def max_depth(root): pass`
        },
        problemId: "max-depth-binary-tree"
      },
      {
        id: "a2z-13-3",
        title: "Lowest Common Ancestor (LCA) in Binary Tree",
        duration: "30:45",
        durationSec: 1845,
        videoUrl: "https://youtu.be/_-QHfMDde90",
        videoId: "_-QHfMDde90",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Recursive search for divergence point where nodes p and q split into separate subtrees.",
        topicsCovered: ["LCA divergence", "Backtracking search", "O(N) traversal"],
        notes: "If left search finds p and right search finds q, current node is the LCA.",
        codeSnippet: {
          cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if(!root || root == p || root == q) return root;\n    TreeNode* left = lowestCommonAncestor(root->left, p, q);\n    TreeNode* right = lowestCommonAncestor(root->right, p, q);\n    if(left && right) return root;\n    return left ? left : right;\n}`,
          java: `// LCA Java`,
          python: `def lca(root, p, q): pass`
        }
      }
    ]
  },
  {
    id: 14,
    title: "Step 14: Binary Search Trees",
    badge: "STEP 14",
    icon: "GitFork",
    description: "Search in BST, Ceil/Floor, Insert/Delete, Valid BST check, and BST from Preorder.",
    lessons: [
      {
        id: "a2z-14-1",
        title: "Search, Ceil & Floor in Binary Search Tree",
        duration: "32:10",
        durationSec: 1930,
        videoUrl: "https://youtu.be/KcNt6v_56cc",
        videoId: "KcNt6v_56cc",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Leverage BST ordering property (Left < Root < Right) for logarithmic search, ceiling, and flooring.",
        topicsCovered: ["BST Invariant", "Logarithmic search", "Ceil & Floor tracking"],
        notes: "If target < node.val, go left; else go right.",
        codeSnippet: {
          cpp: `TreeNode* searchBST(TreeNode* root, int val) {\n    while(root && root->val != val) root = val < root->val ? root->left : root->right;\n    return root;\n}`,
          java: `// Search BST Java`,
          python: `def search_bst(root, val): pass`
        }
      }
    ]
  },
  {
    id: 15,
    title: "Step 15: Graphs [Concepts, BFS/DFS, Topo Sort, Shortest Path, MST]",
    badge: "STEP 15",
    icon: "Network",
    description: "Adjacency representations, BFS, DFS, Kahn's Topo Sort, Dijkstra, Bellman-Ford, and Kruskal's DSU.",
    lessons: [
      {
        id: "a2z-15-1",
        title: "Graph Representation & BFS Traversal",
        duration: "45:50",
        durationSec: 2750,
        videoUrl: "https://youtu.be/-tgVpUgsQ5k",
        videoId: "-tgVpUgsQ5k",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Adjacency matrix vs Adjacency list representations, and Queue-based Breadth-First Search.",
        topicsCovered: ["Adjacency List", "Visited array", "Queue-based level exploration"],
        notes: "BFS explores graph in radial waves from starting node, guaranteeing shortest path in unweighted graphs.",
        codeSnippet: {
          cpp: `void bfs(int start, vector<vector<int>>& adj, int V) {\n    vector<bool> vis(V, false);\n    queue<int> q;\n    q.push(start); vis[start] = true;\n    while(!q.empty()) {\n        int u = q.front(); q.pop();\n        for(int v : adj[u]) if(!vis[v]) { vis[v] = true; q.push(v); }\n    }\n}`,
          java: `// BFS Java`,
          python: `def bfs(adj, start): pass`
        }
      },
      {
        id: "a2z-15-2",
        title: "Depth-First Search (DFS) & Connected Components",
        duration: "38:15",
        durationSec: 2295,
        videoUrl: "https://youtu.be/Qzf1a--rhp8",
        videoId: "Qzf1a--rhp8",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Recursive branch exploration and counting isolated island components.",
        topicsCovered: ["Recursive DFS", "Connected component count", "Graph islands"],
        notes: "DFS explores as deep as possible along each branch before backtracking.",
        codeSnippet: {
          cpp: `void dfs(int u, vector<vector<int>>& adj, vector<bool>& vis) {\n    vis[u] = true;\n    for(int v : adj[u]) if(!vis[v]) dfs(v, adj, vis);\n}`,
          java: `// DFS Java`,
          python: `def dfs(u, adj, vis): pass`
        },
        problemId: "number-of-islands"
      },
      {
        id: "a2z-15-3",
        title: "Dijkstra's Shortest Path Algorithm",
        duration: "52:20",
        durationSec: 3140,
        videoUrl: "https://youtu.be/V6H1qAeB-l4",
        videoId: "V6H1qAeB-l4",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Min-priority queue relaxation finding shortest distance from source on non-negative weighted graphs.",
        topicsCovered: ["Greedy relaxation", "Min priority queue", "O((V + E) log V)"],
        notes: "Relaxation: if dist[u] + weight < dist[v], update dist[v] and push to priority queue.",
        codeSnippet: {
          cpp: `// Dijkstra algorithm implementation`,
          java: `// Java Dijkstra`,
          python: `# Python Dijkstra`
        }
      }
    ]
  },
  {
    id: 16,
    title: "Step 16: Dynamic Programming [1D, 2D, Subsequences, Strings, Stocks, LIS, MCM]",
    badge: "STEP 16",
    icon: "Cpu",
    description: "Memoization, Tabulation, Climbing Stairs, 0/1 Knapsack, Coin Change, LCS, Edit Distance, LIS, and MCM.",
    lessons: [
      {
        id: "a2z-16-1",
        title: "Introduction to Dynamic Programming (Climbing Stairs)",
        duration: "40:30",
        durationSec: 2430,
        videoUrl: "https://youtu.be/tyB0ztf0DNY",
        videoId: "tyB0ztf0DNY",
        source: "takeUforward / Striver",
        difficulty: "Easy",
        description: "Overlapping subproblems, optimal substructure, top-down memoization, and space-optimized rolling DP.",
        topicsCovered: ["Memoization table", "Tabulation order", "O(1) rolling space"],
        notes: "ways(n) = ways(n-1) + ways(n-2) with base cases ways(1)=1, ways(2)=2.",
        codeSnippet: {
          cpp: `int climbStairs(int n) {\n    if(n <= 2) return n;\n    int prev2 = 1, prev1 = 2;\n    for(int i = 3; i <= n; i++) {\n        int curr = prev1 + prev2;\n        prev2 = prev1; prev1 = curr;\n    }\n    return prev1;\n}`,
          java: `// Climbing stairs Java`,
          python: `def climb_stairs(n): pass`
        },
        problemId: "climbing-stairs-problem"
      },
      {
        id: "a2z-16-2",
        title: "0/1 Knapsack & Coin Change Subsequences",
        duration: "49:15",
        durationSec: 2955,
        videoUrl: "https://youtu.be/GqOmJHQZivw",
        videoId: "GqOmJHQZivw",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Pick/Not-pick DP transitions, unbounded coin change, and space optimization to 1D array.",
        topicsCovered: ["Pick / Don't pick transition", "1D array space optimization", "Target sum matching"],
        notes: "Traverse capacity backwards (W down to wt[i]) to optimize 2D knapsack DP table to a single 1D array.",
        codeSnippet: {
          cpp: `int coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for(int i = 1; i <= amount; i++) {\n        for(int c : coins) if(i >= c) dp[i] = min(dp[i], 1 + dp[i - c]);\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}`,
          java: `// Coin change Java`,
          python: `def coin_change(coins, amount): pass`
        },
        problemId: "coin-change"
      },
      {
        id: "a2z-16-3",
        title: "Longest Common Subsequence (LCS)",
        duration: "44:20",
        durationSec: 2660,
        videoUrl: "https://youtu.be/NPZn9jBrX8U",
        videoId: "NPZn9jBrX8U",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "2D string DP grid: matching characters add 1, mismatches branch to max(dp[i-1][j], dp[i][j-1]).",
        topicsCovered: ["2D grid transitions", "Subsequence index alignment", "Printing LCS"],
        notes: "LCS forms the basis for Edit Distance, Shortest Common Supersequence, and diff engines.",
        codeSnippet: {
          cpp: `int lcs(string s1, string s2) {\n    int m = s1.size(), n = s2.size();\n    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n    for(int i = 1; i <= m; i++) {\n        for(int j = 1; j <= n; j++) {\n            if(s1[i-1] == s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return dp[m][n];\n}`,
          java: `// LCS Java`,
          python: `def lcs(s1, s2): pass`
        },
        problemId: "longest-common-subsequence-p"
      }
    ]
  },
  {
    id: 17,
    title: "Step 17: Tries",
    badge: "STEP 17",
    icon: "Boxes",
    description: "Prefix trees, insert, search, prefix matching, Complete String, and bitwise XOR Tries.",
    lessons: [
      {
        id: "a2z-17-1",
        title: "Implement Trie (Prefix Tree)",
        duration: "36:10",
        durationSec: 2170,
        videoUrl: "https://youtu.be/dBGUmUQhjaM",
        videoId: "dBGUmUQhjaM",
        source: "takeUforward / Striver",
        difficulty: "Medium",
        description: "Hierarchical character node structure supporting O(L) prefix lookups and autocomplete.",
        topicsCovered: ["TrieNode structure", "insert() in O(L)", "search() & startsWith()"],
        notes: "Each node holds an array of 26 child pointers and a boolean isEnd flag.",
        codeSnippet: {
          cpp: `struct TrieNode {\n    TrieNode* children[26] = {nullptr};\n    bool isEnd = false;\n};`,
          java: `// Trie Java`,
          python: `class Trie: pass`
        }
      }
    ]
  },
  {
    id: 18,
    title: "Step 18: Advanced Strings / Hard Topics",
    badge: "STEP 18",
    icon: "Code2",
    description: "Z-Algorithm, KMP Longest Prefix Suffix (LPS), Rabin-Karp polynomial hashing.",
    lessons: [
      {
        id: "a2z-18-1",
        title: "KMP String Matching Algorithm & LPS Array",
        duration: "41:35",
        durationSec: 2495,
        videoUrl: "https://youtu.be/V5-7GzOfADQ",
        videoId: "V5-7GzOfADQ",
        source: "takeUforward / Striver",
        difficulty: "Hard",
        description: "Precomputing the Longest Prefix which is also Suffix (LPS) to avoid redundant text comparisons.",
        topicsCovered: ["LPS array construction", "Mismatch pointer jump", "Linear O(N + M) search"],
        notes: "On mismatch, jump the pattern pointer to LPS[j-1] without rewinding the text pointer.",
        codeSnippet: {
          cpp: `// KMP LPS implementation`,
          java: `// KMP Java`,
          python: `# KMP Python`
        }
      }
    ]
  }
];

const allLessons = A2Z_SECTIONS.flatMap(sec => sec.lessons.map((lesson, idx) => ({
  ...lesson,
  sectionId: sec.id,
  sectionTitle: sec.title,
  sectionBadge: sec.badge,
  order: idx + 1
})));

const outputContent = `// Auto-generated Striver A2Z-Style Curriculum Data (${A2Z_SECTIONS.length} Sections, ${allLessons.length} Video Masterclass Lessons)
export const A2Z_SECTIONS = ${JSON.stringify(A2Z_SECTIONS, null, 2)};

export const getAllA2ZLessons = () => {
  return A2Z_SECTIONS.flatMap(sec => sec.lessons.map((lesson, idx) => ({
    ...lesson,
    sectionId: sec.id,
    sectionTitle: sec.title,
    sectionBadge: sec.badge,
    order: idx + 1
  })));
};

export const getA2ZLessonById = (id) => {
  const all = getAllA2ZLessons();
  return all.find(l => l.id === id) || null;
};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/dsaA2ZData.js'), outputContent);
console.log(`Generated dsaA2ZData.js with ${A2Z_SECTIONS.length} sections and ${allLessons.length} lessons!`);
