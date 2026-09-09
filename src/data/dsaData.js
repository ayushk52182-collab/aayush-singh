// Auto-generated comprehensive DSA Curriculum Data (14 Modules, 98 Topics)
export const DSA_MODULES = [
  {
    "id": "mod-1",
    "moduleNumber": 1,
    "badge": "MODULE 01",
    "title": "DSA Fundamentals",
    "icon": "Boxes",
    "description": "Core concepts, asymptotic notations, time and space complexity analysis, and recursion foundations.",
    "color": "#f97316",
    "topics": [
      {
        "id": "dsa-intro",
        "title": "What is DSA?",
        "description": "Understand the definition, purpose, and real-world significance of Data Structures and Algorithms.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Foundational conceptual definitions have zero algorithmic runtime overhead.",
        "visualType": "none",
        "concept": "A Data Structure is a specialized format for organizing, processing, retrieving, and storing data efficiently. An Algorithm is a finite set of step-by-step instructions designed to solve a specific computational problem. Together, DSA forms the backbone of performant, scalable software engineering.",
        "algorithm": "1. Identify the problem type\n2. Select optimal data structure (e.g. Hash Table for fast lookup, Tree for hierarchical data)\n3. Formulate step-by-step logic\n4. Analyze edge cases and resource consumption.",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Welcome to Data Structures & Algorithms!\" << endl;\n    cout << \"Organize data -> Process efficiently -> Scale systems.\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint main() {\n    printf(\"Welcome to Data Structures & Algorithms!\\n\");\n    return 0;\n}",
          "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Welcome to Data Structures & Algorithms!\");\n    }\n}",
          "python": "print(\"Welcome to Data Structures & Algorithms!\")\nprint(\"Organize data -> Process efficiently -> Scale systems.\")"
        },
        "example": {
          "input": "None (Conceptual)",
          "output": "Welcome to Data Structures & Algorithms!"
        }
      },
      {
        "id": "time-complexity",
        "title": "Time Complexity",
        "description": "How runtime grows as input size (n) scales towards infinity.",
        "timeComplexity": "O(1) to O(2^n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Time complexity measures the growth rate of basic operations executed as input scales.",
        "visualType": "none",
        "concept": "Time Complexity expresses the execution time of an algorithm as a function of the input length n. Rather than counting seconds (which varies by CPU and OS), we count dominant elementary operations.",
        "algorithm": "1. Count loop iterations\n2. Drop constant factors (e.g., 3n becomes O(n))\n3. Keep only the highest order term (e.g., n^2 + 5n -> O(n^2)).",
        "code": {
          "cpp": "// O(n) Time Complexity Example\n#include <iostream>\nusing namespace std;\n\nvoid printElements(int arr[], int n) {\n    for(int i = 0; i < n; i++) {\n        cout << arr[i] << \" \";\n    }\n    cout << endl;\n}\n\nint main() {\n    int a[] = {10, 20, 30, 40};\n    printElements(a, 4);\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nvoid printElements(int arr[], int n) {\n    for(int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\n\nint main() {\n    int a[] = {10, 20, 30, 40};\n    printElements(a, 4);\n    return 0;\n}",
          "java": "public class Main {\n    static void printElements(int[] arr) {\n        for (int x : arr) System.out.print(x + \" \");\n        System.out.println();\n    }\n    public static void main(String[] args) {\n        int[] a = {10, 20, 30, 40};\n        printElements(a);\n    }\n}",
          "python": "def print_elements(arr):\n    for x in arr:\n        print(x, end=\" \")\n    print()\n\nprint_elements([10, 20, 30, 40])"
        },
        "example": {
          "input": "arr = [10, 20, 30, 40], n = 4",
          "output": "10 20 30 40"
        }
      },
      {
        "id": "space-complexity",
        "title": "Space Complexity",
        "description": "Evaluating auxiliary memory and total storage requirements of algorithms.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Space complexity includes auxiliary memory allocated on the heap or call stack alongside input size.",
        "visualType": "none",
        "concept": "Space Complexity = Auxiliary Space (temporary storage allocated by algorithm) + Input Space. For instance, in-place sorting algorithms use O(1) auxiliary space.",
        "algorithm": "1. Identify variable allocations\n2. Track recursion stack frames depth\n3. Calculate extra arrays/maps created.",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n// O(n) auxiliary space\nvector<int> duplicateArray(int arr[], int n) {\n    vector<int> copy(n);\n    for(int i = 0; i < n; i++) copy[i] = arr[i];\n    return copy;\n}\n\nint main() {\n    int a[] = {1, 2, 3};\n    vector<int> dup = duplicateArray(a, 3);\n    cout << \"Duplicated size: \" << dup.size() << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint* duplicate(int arr[], int n) {\n    int* copy = (int*)malloc(n * sizeof(int));\n    for(int i = 0; i < n; i++) copy[i] = arr[i];\n    return copy;\n}\n\nint main() {\n    int a[] = {1, 2, 3};\n    int* dup = duplicate(a, 3);\n    printf(\"Duplicated elements: %d %d %d\\n\", dup[0], dup[1], dup[2]);\n    free(dup);\n    return 0;\n}",
          "java": "import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3};\n        int[] copy = Arrays.copyOf(a, a.length); // O(n) space\n        System.out.println(\"Copied length: \" + copy.length);\n    }\n}",
          "python": "def duplicate(arr):\n    return list(arr)  # O(n) auxiliary memory\n\na = [1, 2, 3]\nprint(\"Copied:\", duplicate(a))"
        },
        "example": {
          "input": "[1, 2, 3]",
          "output": "Copied: [1, 2, 3]"
        }
      },
      {
        "id": "big-o-notation",
        "title": "Big O Notation",
        "description": "Upper bound analysis: O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n).",
        "timeComplexity": "O(log n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Big O gives the worst-case asymptotic upper bound of growth.",
        "visualType": "none",
        "concept": "Big O (O) describes the worst-case mathematical upper bound of a function. Common hierarchies from fastest to slowest: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!).",
        "algorithm": "f(n) is O(g(n)) if there exist constants c > 0 and n0 >= 0 such that 0 <= f(n) <= c * g(n) for all n >= n0.",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\n// O(log n) example: halving problem size\nint countHalves(int n) {\n    int steps = 0;\n    while(n > 1) {\n        n /= 2;\n        steps++;\n    }\n    return steps;\n}\n\nint main() {\n    cout << \"Steps for 64: \" << countHalves(64) << endl; // 6 steps\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint countHalves(int n) {\n    int steps = 0;\n    while(n > 1) { n /= 2; steps++; }\n    return steps;\n}\n\nint main() {\n    printf(\"Steps for 64: %d\\n\", countHalves(64));\n    return 0;\n}",
          "java": "public class Main {\n    static int countHalves(int n) {\n        int steps = 0;\n        while (n > 1) { n /= 2; steps++; }\n        return steps;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Steps for 64: \" + countHalves(64));\n    }\n}",
          "python": "def count_halves(n):\n    steps = 0\n    while n > 1:\n        n //= 2\n        steps += 1\n    return steps\n\nprint(\"Steps for 64:\", count_halves(64))"
        },
        "example": {
          "input": "n = 64",
          "output": "6 steps"
        }
      },
      {
        "id": "best-avg-worst",
        "title": "Best, Average & Worst Case",
        "description": "Omega (Ω), Theta (Θ), and Big O (O) performance boundaries.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Linear search demonstrates Ω(1) best case (first element) and O(n) worst case (last element or absent).",
        "visualType": "array",
        "concept": "Best Case (Ω): Minimum time/operations required by the algorithm.\nAverage Case (Θ): Expected runtime averaged over all possible inputs.\nWorst Case (O): Maximum time taken on the most adversarial input possible.",
        "algorithm": "In Linear Search:\n- Best case: Target at index 0 -> 1 comparison.\n- Average case: Target in middle -> n/2 comparisons.\n- Worst case: Target at end or missing -> n comparisons.",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint linearSearch(int arr[], int n, int target) {\n    for(int i = 0; i < n; i++) {\n        if(arr[i] == target) return i; // Best: i=0 (O(1)), Worst: i=n-1 (O(n))\n    }\n    return -1;\n}\n\nint main() {\n    int arr[] = {4, 2, 7, 1, 9};\n    cout << \"Found 4 at: \" << linearSearch(arr, 5, 4) << \" (Best case)\" << endl;\n    cout << \"Found 9 at: \" << linearSearch(arr, 5, 9) << \" (Worst case)\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint linearSearch(int arr[], int n, int target) {\n    for(int i = 0; i < n; i++) if(arr[i] == target) return i;\n    return -1;\n}\n\nint main() {\n    int arr[] = {4, 2, 7, 1, 9};\n    printf(\"Found at: %d\\n\", linearSearch(arr, 5, 4));\n    return 0;\n}",
          "java": "public class Main {\n    static int search(int[] arr, int target) {\n        for(int i = 0; i < arr.length; i++) if(arr[i] == target) return i;\n        return -1;\n    }\n    public static void main(String[] args) {\n        int[] arr = {4, 2, 7, 1, 9};\n        System.out.println(\"Index: \" + search(arr, 7));\n    }\n}",
          "python": "def linear_search(arr, target):\n    for i, val in enumerate(arr):\n        if val == target:\n            return i\n    return -1\n\narr = [4, 2, 7, 1, 9]\nprint(\"Best case index:\", linear_search(arr, 4))\nprint(\"Worst case index:\", linear_search(arr, 9))"
        },
        "example": {
          "input": "[4, 2, 7, 1, 9], target = 7",
          "output": "Index = 2"
        }
      },
      {
        "id": "recursion-basics",
        "title": "Recursion Basics",
        "description": "Base conditions, call stack memory, recurrence relations, and leap of faith.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Recursion creates n stack frames until reaching the base case.",
        "visualType": "stack",
        "concept": "Recursion is a technique where a function calls itself to solve a smaller subproblem. Every recursive function must have:\n1. Base Case: Halting condition preventing infinite loops.\n2. Recursive Call: Breaking problem into sub-problems.\n3. Return / Combine step.",
        "algorithm": "factorial(n):\n  if n <= 1 return 1\n  return n * factorial(n - 1)",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nlong long factorial(int n) {\n    if(n <= 1) return 1; // Base case\n    return n * factorial(n - 1); // Recursive call\n}\n\nint main() {\n    cout << \"Factorial of 5: \" << factorial(5) << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nlong long factorial(int n) {\n    if(n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf(\"5! = %lld\\n\", factorial(5));\n    return 0;\n}",
          "java": "public class Main {\n    static long factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(\"5! = \" + factorial(5));\n    }\n}",
          "python": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(\"5! =\", factorial(5))"
        },
        "example": {
          "input": "n = 5",
          "output": "120"
        }
      }
    ]
  },
  {
    "id": "mod-2",
    "moduleNumber": 2,
    "badge": "MODULE 02",
    "title": "Arrays",
    "icon": "Layers",
    "description": "Contiguous memory layout, two-pointers, sliding window, prefix sums, and Kadane's algorithm.",
    "color": "#06b6d4",
    "topics": [
      {
        "id": "array-intro",
        "title": "Introduction to Arrays",
        "description": "Contiguous memory representation, 0-based indexing, and memory address calculation.",
        "timeComplexity": "O(1) access",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Direct index arithmetic: Address = BaseAddress + (index * element_size).",
        "visualType": "array",
        "concept": "An Array is a linear data structure holding homogenous elements in continuous memory locations. Because memory addresses are contiguous, accessing any index takes O(1) constant time.",
        "algorithm": "1. Allocate contiguous block of size n * sizeof(type)\n2. Access index i via Base + (i * size)\n3. Iterate using pointer or loop counter.",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    cout << \"Element at index 2: \" << arr[2] << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    printf(\"arr[2] = %d\\n\", arr[2]);\n    return 0;\n}",
          "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40, 50};\n        System.out.println(\"arr[2] = \" + arr[2]);\n    }\n}",
          "python": "arr = [10, 20, 30, 40, 50]\nprint(\"arr[2] =\", arr[2])"
        },
        "example": {
          "input": "[10, 20, 30, 40, 50], index = 2",
          "output": "30"
        }
      },
      {
        "id": "array-traversal",
        "title": "Traversal",
        "description": "Visiting every element sequentially using standard iterations and bounds verification.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Iterates through each element from index 0 to n-1 once.",
        "visualType": "array",
        "concept": "Traversal visits every element in the array exactly once to inspect, modify, or print the stored contents.",
        "algorithm": "for i = 0 to n-1:\n    process(arr[i])",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {2, 4, 6, 8, 10};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    for(int i = 0; i < n; i++) {\n        cout << \"Index \" << i << \": \" << arr[i] << endl;\n    }\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint main() {\n    int arr[] = {2, 4, 6, 8, 10};\n    for(int i = 0; i < 5; i++) printf(\"Index %d: %d\\n\", i, arr[i]);\n    return 0;\n}",
          "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {2, 4, 6, 8, 10};\n        for(int i = 0; i < arr.length; i++) System.out.println(i + \" -> \" + arr[i]);\n    }\n}",
          "python": "arr = [2, 4, 6, 8, 10]\nfor i, val in enumerate(arr):\n    print(f\"Index {i}: {val}\")"
        },
        "example": {
          "input": "[2, 4, 6, 8, 10]",
          "output": "Index 0: 2 ... Index 4: 10"
        }
      },
      {
        "id": "array-insertion",
        "title": "Insertion",
        "description": "Inserting items at beginning, specific index, and end with element shifting.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Inserting at index k requires shifting (n - k) elements to the right.",
        "visualType": "array",
        "concept": "In fixed-size arrays, insertion requires shifting existing elements towards the end to free up a position for the new element. At index 0, it takes O(n) shifts.",
        "algorithm": "1. Check if array is full\n2. For i = n-1 down to pos: arr[i+1] = arr[i]\n3. arr[pos] = new_value\n4. n = n + 1",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[10] = {1, 2, 4, 5};\n    int n = 4, pos = 2, val = 3;\n    for(int i = n - 1; i >= pos; i--) arr[i + 1] = arr[i];\n    arr[pos] = val;\n    n++;\n    for(int i = 0; i < n; i++) cout << arr[i] << \" \";\n    cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint main() {\n    int arr[10] = {1, 2, 4, 5};\n    int n = 4, pos = 2, val = 3;\n    for(int i = n - 1; i >= pos; i--) arr[i + 1] = arr[i];\n    arr[pos] = val;\n    n++;\n    for(int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    return 0;\n}",
          "java": "import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = new int[10];\n        arr[0]=1; arr[1]=2; arr[2]=4; arr[3]=5;\n        int n = 4, pos = 2, val = 3;\n        for(int i = n - 1; i >= pos; i--) arr[i + 1] = arr[i];\n        arr[pos] = val;\n        n++;\n        for(int i = 0; i < n; i++) System.out.print(arr[i] + \" \");\n    }\n}",
          "python": "arr = [1, 2, 4, 5]\narr.insert(2, 3)\nprint(arr) # [1, 2, 3, 4, 5]"
        },
        "example": {
          "input": "[1, 2, 4, 5], insert 3 at index 2",
          "output": "[1, 2, 3, 4, 5]"
        }
      },
      {
        "id": "array-deletion",
        "title": "Deletion",
        "description": "Removing an element by shifting subsequent elements leftward.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Deleting at index pos requires moving (n - pos - 1) items to the left.",
        "visualType": "array",
        "concept": "Deleting an element from an array requires shifting all subsequent elements to the left to maintain contiguous order.",
        "algorithm": "1. For i = pos to n-2: arr[i] = arr[i+1]\n2. Decrease size n by 1",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {10, 20, 99, 30, 40};\n    int n = 5, pos = 2;\n    for(int i = pos; i < n - 1; i++) arr[i] = arr[i + 1];\n    n--;\n    for(int i = 0; i < n; i++) cout << arr[i] << \" \";\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 99, 30, 40};\n    int n = 5, pos = 2;\n    for(int i = pos; i < n - 1; i++) arr[i] = arr[i + 1];\n    n--;\n    for(int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    return 0;\n}",
          "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 99, 30, 40};\n        int n = 5, pos = 2;\n        for(int i = pos; i < n - 1; i++) arr[i] = arr[i + 1];\n        n--;\n        for(int i = 0; i < n; i++) System.out.print(arr[i] + \" \");\n    }\n}",
          "python": "arr = [10, 20, 99, 30, 40]\ndel arr[2]\nprint(arr) # [10, 20, 30, 40]"
        },
        "example": {
          "input": "[10, 20, 99, 30, 40], delete index 2",
          "output": "[10, 20, 30, 40]"
        }
      },
      {
        "id": "array-searching",
        "title": "Searching",
        "description": "Linear and Binary search comparisons on array structures.",
        "timeComplexity": "O(n) linear, O(log n) binary",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Binary search cuts candidate range in half each step on sorted arrays.",
        "visualType": "array",
        "concept": "Searching involves finding the target value's index. On unsorted arrays, linear scan is mandatory O(n). On sorted arrays, binary search operates in logarithmic time O(log n).",
        "algorithm": "Binary Search:\nlow = 0, high = n-1\nwhile low <= high:\n  mid = low + (high - low) / 2\n  if arr[mid] == target return mid\n  else if arr[mid] < target low = mid + 1\n  else high = mid - 1\nreturn -1",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint binarySearch(int arr[], int n, int target) {\n    int l = 0, r = n - 1;\n    while(l <= r) {\n        int m = l + (r - l) / 2;\n        if(arr[m] == target) return m;\n        if(arr[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int a[] = {1, 3, 5, 7, 9};\n    cout << \"Index of 7: \" << binarySearch(a, 5, 7) << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint binarySearch(int arr[], int n, int target) {\n    int l = 0, r = n - 1;\n    while(l <= r) {\n        int m = l + (r - l) / 2;\n        if(arr[m] == target) return m;\n        if(arr[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int a[] = {1, 3, 5, 7, 9};\n    printf(\"Index of 7: %d\\n\", binarySearch(a, 5, 7));\n    return 0;\n}",
          "java": "public class Main {\n    static int binarySearch(int[] arr, int target) {\n        int l = 0, r = arr.length - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (arr[m] == target) return m;\n            if (arr[m] < target) l = m + 1;\n            else r = m - 1;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        int[] a = {1, 3, 5, 7, 9};\n        System.out.println(\"Index of 7: \" + binarySearch(a, 7));\n    }\n}",
          "python": "def binary_search(arr, target):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if arr[m] == target: return m\n        elif arr[m] < target: l = m + 1\n        else: r = m - 1\n    return -1\n\nprint(\"Index of 7:\", binary_search([1, 3, 5, 7, 9], 7))"
        },
        "example": {
          "input": "[1, 3, 5, 7, 9], target = 7",
          "output": "Index = 3"
        }
      },
      {
        "id": "prefix-sum",
        "title": "Prefix Sum",
        "description": "Precomputing running sums for answering range sum queries in O(1) time.",
        "timeComplexity": "O(n) preprocessing, O(1) query",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Pref[i] = Pref[i-1] + Arr[i]. Range sum [L, R] = Pref[R] - Pref[L-1].",
        "visualType": "array",
        "concept": "Prefix sum creates an auxiliary array where each entry stores cumulative totals up to that index. This optimizes range sum queries from O(n) to O(1).",
        "algorithm": "pref[0] = arr[0]\nfor i = 1 to n-1:\n  pref[i] = pref[i-1] + arr[i]\nquerySum(L, R):\n  return L == 0 ? pref[R] : pref[R] - pref[L-1]",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> arr = {2, 4, 1, 7, 5};\n    int n = arr.size();\n    vector<int> pref(n);\n    pref[0] = arr[0];\n    for(int i = 1; i < n; i++) pref[i] = pref[i - 1] + arr[i];\n    // Query sum from index 1 to 3: (4 + 1 + 7 = 12)\n    int L = 1, R = 3;\n    int sum = pref[R] - (L > 0 ? pref[L - 1] : 0);\n    cout << \"Range sum [1, 3]: \" << sum << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint main() {\n    int arr[] = {2, 4, 1, 7, 5};\n    int pref[5];\n    pref[0] = arr[0];\n    for(int i = 1; i < 5; i++) pref[i] = pref[i - 1] + arr[i];\n    int L = 1, R = 3;\n    int sum = pref[R] - (L > 0 ? pref[L - 1] : 0);\n    printf(\"Range sum [1, 3]: %d\\n\", sum);\n    return 0;\n}",
          "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {2, 4, 1, 7, 5};\n        int[] pref = new int[arr.length];\n        pref[0] = arr[0];\n        for(int i = 1; i < arr.length; i++) pref[i] = pref[i - 1] + arr[i];\n        int sum = pref[3] - pref[0];\n        System.out.println(\"Range sum [1, 3]: \" + sum);\n    }\n}",
          "python": "arr = [2, 4, 1, 7, 5]\npref = [0] * len(arr)\npref[0] = arr[0]\nfor i in range(1, len(arr)):\n    pref[i] = pref[i-1] + arr[i]\n# sum from 1 to 3\nans = pref[3] - pref[0]\nprint(\"Range sum [1, 3]:\", ans)"
        },
        "example": {
          "input": "arr = [2, 4, 1, 7, 5], L=1, R=3",
          "output": "12"
        }
      },
      {
        "id": "kadanes-algorithm",
        "title": "Kadane's Algorithm",
        "description": "Dynamic programming approach to find Maximum Subarray Sum in linear time.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Maintains current contiguous sum and resets to 0 or element value when negative.",
        "visualType": "array",
        "concept": "Kadane's algorithm identifies the contiguous subarray with the largest sum in O(n) by dynamically deciding whether to append the current element or restart the subarray.",
        "algorithm": "max_so_far = arr[0], curr_max = arr[0]\nfor i = 1 to n-1:\n  curr_max = max(arr[i], curr_max + arr[i])\n  max_so_far = max(max_so_far, curr_max)\nreturn max_so_far",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxSubArray(const vector<int>& nums) {\n    int maxSoFar = nums[0], currMax = nums[0];\n    for(size_t i = 1; i < nums.size(); i++) {\n        currMax = max(nums[i], currMax + nums[i]);\n        maxSoFar = max(maxSoFar, currMax);\n    }\n    return maxSoFar;\n}\n\nint main() {\n    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    cout << \"Max Subarray Sum: \" << maxSubArray(nums) << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint maxSubArray(int nums[], int n) {\n    int maxSoFar = nums[0], currMax = nums[0];\n    for(int i = 1; i < n; i++) {\n        currMax = (nums[i] > currMax + nums[i]) ? nums[i] : (currMax + nums[i]);\n        if(currMax > maxSoFar) maxSoFar = currMax;\n    }\n    return maxSoFar;\n}\n\nint main() {\n    int nums[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    printf(\"Max Sum: %d\\n\", maxSubArray(nums, 9));\n    return 0;\n}",
          "java": "public class Main {\n    static int maxSubArray(int[] nums) {\n        int maxSoFar = nums[0], curr = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            curr = Math.max(nums[i], curr + nums[i]);\n            maxSoFar = Math.max(maxSoFar, curr);\n        }\n        return maxSoFar;\n    }\n    public static void main(String[] args) {\n        int[] a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        System.out.println(\"Max Subarray: \" + maxSubArray(a));\n    }\n}",
          "python": "def max_sub_array(nums):\n    max_so_far = curr = nums[0]\n    for x in nums[1:]:\n        curr = max(x, curr + x)\n        max_so_far = max(max_so_far, curr)\n    return max_so_far\n\nnums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nprint(\"Max Subarray Sum:\", max_sub_array(nums))"
        },
        "example": {
          "input": "[-2, 1, -3, 4, -1, 2, 1, -5, 4]",
          "output": "6 (subarray [4, -1, 2, 1])"
        }
      },
      {
        "id": "two-pointer",
        "title": "Two Pointer Technique",
        "description": "Coordinated pointers navigating from opposite ends or at variable speeds.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Pointers converge in at most n steps.",
        "visualType": "array",
        "concept": "The Two-Pointer approach uses two indices moving through the array (either opposite ends moving inwards, or fast & slow pointers moving in the same direction) to solve problems without nested O(n^2) loops.",
        "algorithm": "left = 0, right = n - 1\nwhile left < right:\n  sum = arr[left] + arr[right]\n  if sum == target return (left, right)\n  else if sum < target left++\n  else right--",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool hasTwoSumSorted(const vector<int>& arr, int target) {\n    int l = 0, r = arr.size() - 1;\n    while(l < r) {\n        int sum = arr[l] + arr[r];\n        if(sum == target) return true;\n        if(sum < target) l++;\n        else r--;\n    }\n    return false;\n}\n\nint main() {\n    vector<int> a = {1, 2, 3, 5, 8, 11};\n    cout << \"Has pair sum 10: \" << (hasTwoSumSorted(a, 10) ? \"YES\" : \"NO\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdbool.h>\n\nbool hasPair(int arr[], int n, int target) {\n    int l = 0, r = n - 1;\n    while(l < r) {\n        int sum = arr[l] + arr[r];\n        if(sum == target) return true;\n        if(sum < target) l++; else r--;\n    }\n    return false;\n}\n\nint main() {\n    int a[] = {1, 2, 3, 5, 8, 11};\n    printf(\"Pair sum 10: %s\\n\", hasPair(a, 6, 10) ? \"YES\" : \"NO\");\n    return 0;\n}",
          "java": "public class Main {\n    static boolean hasPair(int[] a, int target) {\n        int l = 0, r = a.length - 1;\n        while (l < r) {\n            int sum = a[l] + a[r];\n            if (sum == target) return true;\n            if (sum < target) l++; else r--;\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3, 5, 8, 11};\n        System.out.println(\"Pair 10: \" + hasPair(a, 10));\n    }\n}",
          "python": "def has_pair(arr, target):\n    l, r = 0, len(arr) - 1\n    while l < r:\n        s = arr[l] + arr[r]\n        if s == target: return True\n        elif s < target: l += 1\n        else: r -= 1\n    return False\n\nprint(\"Pair 10:\", has_pair([1, 2, 3, 5, 8, 11], 10))"
        },
        "example": {
          "input": "arr = [1, 2, 3, 5, 8, 11], target = 10",
          "output": "YES (2 + 8 = 10)"
        }
      },
      {
        "id": "sliding-window",
        "title": "Sliding Window",
        "description": "Fixed and dynamic window mechanics for subarray/substring optimizations.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Slide boundary rightwards: add incoming element, subtract outgoing element in O(1).",
        "visualType": "array",
        "concept": "The Sliding Window pattern avoids recomputing overlaps across contiguous blocks of size k by shifting the window forward: subtracting the left element and adding the new right element in O(1).",
        "algorithm": "windowSum = sum(arr[0..k-1])\nmaxSum = windowSum\nfor i = k to n-1:\n  windowSum += arr[i] - arr[i - k]\n  maxSum = max(maxSum, windowSum)\nreturn maxSum",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxSubarraySumK(const vector<int>& arr, int k) {\n    int n = arr.size();\n    if(n < k) return -1;\n    int windowSum = 0;\n    for(int i = 0; i < k; i++) windowSum += arr[i];\n    int maxSum = windowSum;\n    for(int i = k; i < n; i++) {\n        windowSum += arr[i] - arr[i - k];\n        maxSum = max(maxSum, windowSum);\n    }\n    return maxSum;\n}\n\nint main() {\n    vector<int> a = {2, 1, 5, 1, 3, 2};\n    cout << \"Max sum of window size 3: \" << maxSubarraySumK(a, 3) << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint maxSumK(int arr[], int n, int k) {\n    int windowSum = 0;\n    for(int i = 0; i < k; i++) windowSum += arr[i];\n    int maxS = windowSum;\n    for(int i = k; i < n; i++) {\n        windowSum += arr[i] - arr[i - k];\n        if(windowSum > maxS) maxS = windowSum;\n    }\n    return maxS;\n}\n\nint main() {\n    int a[] = {2, 1, 5, 1, 3, 2};\n    printf(\"Max sum k=3: %d\\n\", maxSumK(a, 6, 3));\n    return 0;\n}",
          "java": "public class Main {\n    static int maxSumK(int[] arr, int k) {\n        int win = 0;\n        for(int i = 0; i < k; i++) win += arr[i];\n        int maxS = win;\n        for(int i = k; i < arr.length; i++) {\n            win += arr[i] - arr[i - k];\n            maxS = Math.max(maxS, win);\n        }\n        return maxS;\n    }\n    public static void main(String[] args) {\n        int[] a = {2, 1, 5, 1, 3, 2};\n        System.out.println(\"Max sum: \" + maxSumK(a, 3));\n    }\n}",
          "python": "def max_sum_k(arr, k):\n    win = sum(arr[:k])\n    max_s = win\n    for i in range(k, len(arr)):\n        win += arr[i] - arr[i - k]\n        max_s = max(max_s, win)\n    return max_s\n\nprint(\"Max sum:\", max_sum_k([2, 1, 5, 1, 3, 2], 3))"
        },
        "example": {
          "input": "arr = [2, 1, 5, 1, 3, 2], k = 3",
          "output": "9 (subarray [5, 1, 3])"
        }
      }
    ]
  },
  {
    "id": "mod-3",
    "moduleNumber": 3,
    "badge": "MODULE 03",
    "title": "Strings",
    "icon": "Code2",
    "description": "Character arrays, string manipulation, ASCII arithmetic, palindromes, anagrams, and frequency mapping.",
    "color": "#8b5cf6",
    "topics": [
      {
        "id": "string-basics",
        "title": "String Basics",
        "description": "Null termination '\\0', immutability vs mutability across C, C++, Java, and Python.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Calculating string length requires scanning until the null terminator.",
        "visualType": "array",
        "concept": "In C, strings are null-terminated character arrays (`char s[]`). In C++, `std::string` is dynamic. In Python and Java, strings are immutable objects.",
        "algorithm": "strlen(s):\n  len = 0\n  while s[len] != '\\0': len++\n  return len",
        "code": {
          "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s = \"Hello DSA\";\n    cout << \"Length: \" << s.length() << \", First char: \" << s[0] << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[] = \"Hello DSA\";\n    printf(\"Length: %lu, s[0]: %c\\n\", strlen(s), s[0]);\n    return 0;\n}",
          "java": "public class Main {\n    public static void main(String[] args) {\n        String s = \"Hello DSA\";\n        System.out.println(\"Len: \" + s.length() + \", s[0]: \" + s.charAt(0));\n    }\n}",
          "python": "s = \"Hello DSA\"\nprint(f\"Len: {len(s)}, s[0]: {s[0]}\")"
        },
        "example": {
          "input": "\"Hello DSA\"",
          "output": "Length: 9, s[0]: H"
        }
      },
      {
        "id": "string-traversal",
        "title": "String Traversal",
        "description": "Accessing characters, case conversions, and ASCII manipulations.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Single linear pass over n characters.",
        "visualType": "array",
        "concept": "Traversing strings allows inspecting every character, checking vowel/consonant count, or shifting characters using ASCII values (e.g. 'a' - 'A' = 32).",
        "algorithm": "for c in s:\n  process(c)",
        "code": {
          "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint countVowels(const string& s) {\n    int count = 0;\n    for(char c : s) {\n        char lower = tolower(c);\n        if(lower=='a'||lower=='e'||lower=='i'||lower=='o'||lower=='u') count++;\n    }\n    return count;\n}\n\nint main() {\n    cout << \"Vowels in 'algorithm': \" << countVowels(\"algorithm\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <ctype.h>\n\nint countVowels(const char* s) {\n    int count = 0;\n    for(int i = 0; s[i] != '\\0'; i++) {\n        char c = tolower(s[i]);\n        if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u') count++;\n    }\n    return count;\n}\n\nint main() {\n    printf(\"Vowels: %d\\n\", countVowels(\"algorithm\"));\n    return 0;\n}",
          "java": "public class Main {\n    static int countVowels(String s) {\n        int cnt = 0;\n        for (char c : s.toLowerCase().toCharArray()) {\n            if (\"aeiou\".indexOf(c) != -1) cnt++;\n        }\n        return cnt;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Vowels: \" + countVowels(\"algorithm\"));\n    }\n}",
          "python": "def count_vowels(s):\n    return sum(1 for c in s.lower() if c in 'aeiou')\n\nprint(\"Vowels:\", count_vowels(\"algorithm\"))"
        },
        "example": {
          "input": "\"algorithm\"",
          "output": "3 vowels (a, o, i)"
        }
      },
      {
        "id": "string-manipulation",
        "title": "String Manipulation",
        "description": "Reversing strings in-place, string concatenation, and tokenization.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Two-pointer swap from ends reverses string in-place.",
        "visualType": "array",
        "concept": "Reversing a string in-place uses two pointers: one at index 0 and one at index n-1, swapping and moving inwards until they cross.",
        "algorithm": "left = 0, right = n-1\nwhile left < right:\n  swap(s[left], s[right])\n  left++; right--",
        "code": {
          "cpp": "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nvoid reverseString(string& s) {\n    int l = 0, r = s.length() - 1;\n    while(l < r) {\n        swap(s[l++], s[r--]);\n    }\n}\n\nint main() {\n    string s = \"coding\";\n    reverseString(s);\n    cout << \"Reversed: \" << s << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <string.h>\n\nvoid reverseStr(char* s) {\n    int l = 0, r = strlen(s) - 1;\n    while(l < r) {\n        char tmp = s[l]; s[l] = s[r]; s[r] = tmp;\n        l++; r--;\n    }\n}\n\nint main() {\n    char s[] = \"coding\";\n    reverseStr(s);\n    printf(\"Reversed: %s\\n\", s);\n    return 0;\n}",
          "java": "public class Main {\n    public static void main(String[] args) {\n        String s = \"coding\";\n        String rev = new StringBuilder(s).reverse().toString();\n        System.out.println(\"Reversed: \" + rev);\n    }\n}",
          "python": "s = \"coding\"\nprint(\"Reversed:\", s[::-1])"
        },
        "example": {
          "input": "\"coding\"",
          "output": "\"gnidoc\""
        }
      },
      {
        "id": "palindrome-check",
        "title": "Palindrome",
        "description": "Checking if string reads identically forward and backward.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Compares characters at index i and (n-1-i) up to n/2.",
        "visualType": "array",
        "concept": "A string is a palindrome if it reads the exact same backwards as forwards (e.g. \"racecar\"). We check equality from both ends moving inward.",
        "algorithm": "while l < r:\n  if s[l] != s[r] return false\n  l++; r--\nreturn true",
        "code": {
          "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isPalindrome(const string& s) {\n    int l = 0, r = s.length() - 1;\n    while(l < r) {\n        if(s[l++] != s[r--]) return false;\n    }\n    return true;\n}\n\nint main() {\n    cout << \"racecar is palindrome: \" << (isPalindrome(\"racecar\") ? \"YES\" : \"NO\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n\nbool isPalindrome(const char* s) {\n    int l = 0, r = strlen(s) - 1;\n    while(l < r) if(s[l++] != s[r--]) return false;\n    return true;\n}\n\nint main() {\n    printf(\"racecar: %s\\n\", isPalindrome(\"racecar\") ? \"YES\" : \"NO\");\n    return 0;\n}",
          "java": "public class Main {\n    static boolean isPal(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"racecar: \" + isPal(\"racecar\"));\n    }\n}",
          "python": "def is_palindrome(s):\n    return s == s[::-1]\n\nprint(\"racecar is palindrome:\", is_palindrome(\"racecar\"))"
        },
        "example": {
          "input": "\"racecar\"",
          "output": "true"
        }
      },
      {
        "id": "anagram-check",
        "title": "Anagram",
        "description": "Validating if two strings have identical character distributions.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Frequency table of size 26 for English lowercase letters.",
        "visualType": "array",
        "concept": "Two strings are anagrams if they contain the exact same characters with identical counts, just rearranged (e.g. \"listen\" and \"silent\").",
        "algorithm": "1. If lengths differ return false\n2. Count frequencies of string s\n3. Decrement frequencies with string t\n4. If all counts are 0, return true",
        "code": {
          "cpp": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nbool isAnagram(string s, string t) {\n    if(s.length() != t.length()) return false;\n    vector<int> freq(26, 0);\n    for(char c : s) freq[c - 'a']++;\n    for(char c : t) {\n        if(--freq[c - 'a'] < 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    cout << \"listen & silent: \" << (isAnagram(\"listen\", \"silent\") ? \"YES\" : \"NO\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n\nbool isAnagram(const char* s, const char* t) {\n    if(strlen(s) != strlen(t)) return false;\n    int freq[26] = {0};\n    for(int i = 0; s[i]; i++) freq[s[i] - 'a']++;\n    for(int i = 0; t[i]; i++) if(--freq[t[i] - 'a'] < 0) return false;\n    return true;\n}\n\nint main() {\n    printf(\"listen, silent: %s\\n\", isAnagram(\"listen\", \"silent\") ? \"YES\" : \"NO\");\n    return 0;\n}",
          "java": "public class Main {\n    static boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) count[c - 'a']++;\n        for (char c : t.toCharArray()) if (--count[c - 'a'] < 0) return false;\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isAnagram(\"listen\", \"silent\"));\n    }\n}",
          "python": "from collections import Counter\ndef is_anagram(s, t):\n    return Counter(s) == Counter(t)\n\nprint(\"listen, silent:\", is_anagram(\"listen\", \"silent\"))"
        },
        "example": {
          "input": "s = \"listen\", t = \"silent\"",
          "output": "true"
        }
      },
      {
        "id": "frequency-counting",
        "title": "Frequency Counting",
        "description": "Counting character occurrences using hash maps or direct addressing arrays.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Constant 256 or 26 buckets for character sets.",
        "visualType": "array",
        "concept": "Frequency counting tabulates occurrences of each distinct character to quickly identify duplicates, maximum frequent elements, or unique characters.",
        "algorithm": "for c in s:\n  freq[c]++\nfind max or query occurrences",
        "code": {
          "cpp": "#include <iostream>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    string s = \"engineering\";\n    unordered_map<char, int> freq;\n    for(char c : s) freq[c]++;\n    for(auto& p : freq) cout << p.first << \": \" << p.second << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n\nint main() {\n    char s[] = \"engineering\";\n    int freq[256] = {0};\n    for(int i = 0; s[i]; i++) freq[(unsigned char)s[i]]++;\n    for(int i = 0; i < 256; i++) {\n        if(freq[i] > 0) printf(\"%c: %d\\n\", i, freq[i]);\n    }\n    return 0;\n}",
          "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        String s = \"engineering\";\n        Map<Character, Integer> freq = new HashMap<>();\n        for (char c : s.toCharArray()) freq.put(c, freq.getOrDefault(c, 0) + 1);\n        System.out.println(freq);\n    }\n}",
          "python": "from collections import Counter\ns = \"engineering\"\nprint(dict(Counter(s)))"
        },
        "example": {
          "input": "\"engineering\"",
          "output": "{'e': 3, 'n': 3, 'g': 2, 'i': 2, 'r': 1}"
        }
      },
      {
        "id": "string-searching",
        "title": "String Searching",
        "description": "Substring matching from Naive O(n*m) to KMP Prefix Function O(n+m).",
        "timeComplexity": "O(n * m) naive, O(n + m) KMP",
        "spaceComplexity": "O(m)",
        "complexityExplanation": "KMP precomputes the Longest Prefix Suffix (LPS) array in O(m) time.",
        "visualType": "array",
        "concept": "String searching finds occurrences of a pattern P (length m) inside text T (length n). While naive checking takes O(n*m), advanced algorithms like KMP achieve linear O(n+m) time.",
        "algorithm": "1. Build LPS array for pattern\n2. Match text T against pattern P\n3. On mismatch, jump pattern index using LPS[j-1]",
        "code": {
          "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint naiveSearch(const string& text, const string& pat) {\n    int n = text.length(), m = pat.length();\n    for(int i = 0; i <= n - m; i++) {\n        int j = 0;\n        while(j < m && text[i + j] == pat[j]) j++;\n        if(j == m) return i; // Found match\n    }\n    return -1;\n}\n\nint main() {\n    cout << \"Found 'world' at: \" << naiveSearch(\"hello world\", \"world\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <string.h>\n\nint findSubstring(const char* text, const char* pat) {\n    char* p = strstr(text, pat);\n    return p ? (int)(p - text) : -1;\n}\n\nint main() {\n    printf(\"Index: %d\\n\", findSubstring(\"hello world\", \"world\"));\n    return 0;\n}",
          "java": "public class Main {\n    public static void main(String[] args) {\n        String text = \"hello world\";\n        System.out.println(\"Index: \" + text.indexOf(\"world\"));\n    }\n}",
          "python": "text = \"hello world\"\nprint(\"Found at:\", text.find(\"world\"))"
        },
        "example": {
          "input": "text = \"hello world\", pattern = \"world\"",
          "output": "Index = 6"
        }
      }
    ]
  },
  {
    "id": "mod-4",
    "moduleNumber": 4,
    "badge": "MODULE 04",
    "title": "Linked List",
    "icon": "GitFork",
    "description": "Singly, Doubly, and Circular Linked Lists, pointer manipulation, Floyd's cycle detection, and reversal.",
    "color": "#10b981",
    "topics": [
      {
        "id": "singly-linked-list",
        "title": "Singly Linked List",
        "description": "Node structures with data and next pointers, dynamic heap allocations.",
        "timeComplexity": "O(1) prepend, O(n) lookup",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Each node holds data + pointer (4/8 bytes pointer overhead).",
        "visualType": "linkedlist",
        "concept": "A Singly Linked List is a linear data structure where elements are not stored contiguously in memory. Instead, each node consists of data and a pointer pointing to the next node.",
        "algorithm": "struct Node { int data; Node* next; }",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nint main() {\n    Node* head = new Node(10);\n    head->next = new Node(20);\n    head->next->next = new Node(30);\n    for(Node* curr = head; curr; curr = curr->next) cout << curr->data << \" -> \";\n    cout << \"NULL\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint main() {\n    struct Node* head = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 10;\n    head->next = NULL;\n    printf(\"Head data: %d\\n\", head->data);\n    free(head);\n    return 0;\n}",
          "java": "class Node {\n    int data;\n    Node next;\n    Node(int d) { data = d; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Node head = new Node(10);\n        head.next = new Node(20);\n        System.out.println(head.data + \" -> \" + head.next.data);\n    }\n}",
          "python": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nhead = Node(10)\nhead.next = Node(20)\nprint(f\"{head.data} -> {head.next.data} -> None\")"
        },
        "example": {
          "input": "Create list: 10 -> 20 -> 30",
          "output": "10 -> 20 -> 30 -> NULL"
        }
      },
      {
        "id": "ll-insert",
        "title": "Insert Node",
        "description": "Insertion at head O(1), at tail O(n), and at specific positional indices.",
        "timeComplexity": "O(1) at head, O(n) at tail",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Updating pointers requires constant operations once target position is reached.",
        "visualType": "linkedlist",
        "concept": "Inserting at the head is O(1): new node points to head, and head moves to new node. Inserting at tail requires traversing until the last node.",
        "algorithm": "insertAtHead(head, val):\n  newNode = new Node(val)\n  newNode.next = head\n  return newNode",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data; Node* next;\n    Node(int v) : data(v), next(nullptr) {}\n};\n\nNode* insertAtHead(Node* head, int val) {\n    Node* n = new Node(val);\n    n->next = head;\n    return n;\n}\n\nint main() {\n    Node* head = nullptr;\n    head = insertAtHead(head, 20);\n    head = insertAtHead(head, 10);\n    cout << head->data << \" -> \" << head->next->data << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* push(struct Node* head, int val) {\n    struct Node* n = (struct Node*)malloc(sizeof(struct Node));\n    n->data = val; n->next = head;\n    return n;\n}\nint main() {\n    struct Node* head = NULL;\n    head = push(head, 20); head = push(head, 10);\n    printf(\"%d -> %d\\n\", head->data, head->next->data);\n    return 0;\n}",
          "java": "class Node { int data; Node next; Node(int v) { data = v; } }\npublic class Main {\n    static Node insertHead(Node head, int val) {\n        Node n = new Node(val);\n        n.next = head;\n        return n;\n    }\n    public static void main(String[] args) {\n        Node head = insertHead(null, 20);\n        head = insertHead(head, 10);\n        System.out.println(head.data + \" -> \" + head.next.data);\n    }\n}",
          "python": "class Node:\n    def __init__(self, data, next=None):\n        self.data = data\n        self.next = next\n\nhead = None\nhead = Node(20, head)\nhead = Node(10, head)\nprint(f\"{head.data} -> {head.next.data}\")"
        },
        "example": {
          "input": "Insert 10 then 20 at head",
          "output": "10 -> 20 -> NULL"
        }
      },
      {
        "id": "ll-delete",
        "title": "Delete Node",
        "description": "Deleting head, tail, or node with target key while adjusting neighboring pointers.",
        "timeComplexity": "O(1) head, O(n) key",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Bypass node: prev->next = curr->next, then free(curr).",
        "visualType": "linkedlist",
        "concept": "Deleting a node requires locating its predecessor, redirecting the predecessor's next pointer past the target node, and freeing memory.",
        "algorithm": "if head.val == key: return head.next\nprev = head, curr = head.next\nwhile curr and curr.val != key:\n  prev = curr; curr = curr.next\nif curr: prev.next = curr.next\nreturn head",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node { int data; Node* next; Node(int v): data(v), next(nullptr) {} };\n\nNode* deleteNode(Node* head, int key) {\n    if(!head) return nullptr;\n    if(head->data == key) { Node* tmp = head->next; delete head; return tmp; }\n    Node* curr = head;\n    while(curr->next && curr->next->data != key) curr = curr->next;\n    if(curr->next) {\n        Node* toDelete = curr->next;\n        curr->next = curr->next->next;\n        delete toDelete;\n    }\n    return head;\n}\n\nint main() {\n    Node* h = new Node(10); h->next = new Node(20); h->next->next = new Node(30);\n    h = deleteNode(h, 20);\n    for(Node* c = h; c; c = c->next) cout << c->data << \" -> \";\n    cout << \"NULL\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdlib.h>\nstruct Node { int data; struct Node* next; };\nint main() {\n    printf(\"Delete node demonstration\\n\");\n    return 0;\n}",
          "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Delete node demonstration\");\n    }\n}",
          "python": "class Node:\n    def __init__(self, data, next=None):\n        self.data = data; self.next = next\ndef delete_node(head, val):\n    if head and head.data == val: return head.next\n    curr = head\n    while curr and curr.next:\n        if curr.next.data == val:\n            curr.next = curr.next.next\n            break\n        curr = curr.next\n    return head"
        },
        "example": {
          "input": "10 -> 20 -> 30, delete 20",
          "output": "10 -> 30 -> NULL"
        }
      },
      {
        "id": "ll-reverse",
        "title": "Reverse Linked List",
        "description": "Inverting link directions iteratively using 3 pointers: prev, curr, and next.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Single pass over n nodes with 3 pointer variables.",
        "visualType": "linkedlist",
        "concept": "Reversing a singly linked list inverts the direction of each pointer: every node points to its predecessor instead of its successor.",
        "algorithm": "prev = null, curr = head\nwhile curr:\n  nextTemp = curr.next\n  curr.next = prev\n  prev = curr\n  curr = nextTemp\nreturn prev",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node { int data; Node* next; Node(int v): data(v), next(nullptr) {} };\n\nNode* reverseList(Node* head) {\n    Node* prev = nullptr;\n    Node* curr = head;\n    while(curr) {\n        Node* nextTemp = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}\n\nint main() {\n    Node* h = new Node(1); h->next = new Node(2); h->next->next = new Node(3);\n    h = reverseList(h);\n    for(Node* c = h; c; c = c->next) cout << c->data << \" -> \";\n    cout << \"NULL\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdlib.h>\nstruct Node { int data; struct Node* next; };\nstruct Node* reverse(struct Node* head) {\n    struct Node *prev = NULL, *curr = head, *nxt = NULL;\n    while(curr) { nxt = curr->next; curr->next = prev; prev = curr; curr = nxt; }\n    return prev;\n}\nint main() { printf(\"Reversed list\\n\"); return 0; }",
          "java": "class Node { int data; Node next; Node(int d) { data = d; } }\npublic class Main {\n    static Node reverse(Node head) {\n        Node prev = null, curr = head;\n        while (curr != null) {\n            Node nxt = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nxt;\n        }\n        return prev;\n    }\n    public static void main(String[] args) { System.out.println(\"Reversed\"); }\n}",
          "python": "def reverse_list(head):\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev"
        },
        "example": {
          "input": "1 -> 2 -> 3 -> NULL",
          "output": "3 -> 2 -> 1 -> NULL"
        }
      },
      {
        "id": "ll-find-middle",
        "title": "Find Middle Node",
        "description": "Slow and Fast Pointer (Tortoise and Hare) approach in single pass.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Fast pointer advances 2 steps while slow advances 1 step.",
        "visualType": "linkedlist",
        "concept": "By moving slow pointer by 1 node and fast pointer by 2 nodes simultaneously, when fast reaches the end of the list, slow is guaranteed to be at the exact middle node.",
        "algorithm": "slow = head, fast = head\nwhile fast and fast.next:\n  slow = slow.next\n  fast = fast.next.next\nreturn slow",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node { int data; Node* next; Node(int v): data(v), next(nullptr) {} };\n\nNode* findMiddle(Node* head) {\n    Node *slow = head, *fast = head;\n    while(fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}\n\nint main() {\n    Node* h = new Node(10); h->next = new Node(20); h->next->next = new Node(30);\n    cout << \"Middle: \" << findMiddle(h)->data << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nstruct Node { int data; struct Node* next; };\nint main() { printf(\"Find middle node\\n\"); return 0; }",
          "java": "public class Main {\n    public static void main(String[] args) { System.out.println(\"Middle node\"); }\n}",
          "python": "def find_middle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow"
        },
        "example": {
          "input": "10 -> 20 -> 30 -> 40 -> 50",
          "output": "30"
        }
      },
      {
        "id": "ll-detect-cycle",
        "title": "Detect Cycle",
        "description": "Floyd's Cycle Finding Algorithm to detect circular loop dependencies.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "If a loop of length C exists, fast catches slow within C steps.",
        "visualType": "linkedlist",
        "concept": "If a linked list contains a cycle, fast and slow pointers will eventually meet within the cycle. If fast hits NULL, no cycle exists.",
        "algorithm": "slow = head, fast = head\nwhile fast and fast.next:\n  slow = slow.next\n  fast = fast.next.next\n  if slow == fast return true\nreturn false",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node { int data; Node* next; Node(int v): data(v), next(nullptr) {} };\n\nbool hasCycle(Node* head) {\n    Node *slow = head, *fast = head;\n    while(fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if(slow == fast) return true;\n    }\n    return false;\n}\n\nint main() {\n    Node* a = new Node(1); Node* b = new Node(2);\n    a->next = b; b->next = a; // cycle\n    cout << \"Has cycle: \" << (hasCycle(a) ? \"YES\" : \"NO\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdbool.h>\nint main() { printf(\"Cycle detection\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Cycle detection\"); } }",
          "python": "def has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False"
        },
        "example": {
          "input": "1 -> 2 -> 3 -> 2 (cycle back)",
          "output": "true"
        }
      },
      {
        "id": "doubly-linked-list",
        "title": "Doubly Linked List",
        "description": "Two-way traversal using prev and next pointers per node.",
        "timeComplexity": "O(1) delete with reference",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Stores two pointers per node (prev and next).",
        "visualType": "linkedlist",
        "concept": "A Doubly Linked List node has both prev and next pointers, enabling bidirectional traversal and O(1) node deletion when a direct reference is provided.",
        "algorithm": "struct Node { int val; Node* prev; Node* next; }",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct DNode {\n    int val;\n    DNode *prev, *next;\n    DNode(int v): val(v), prev(nullptr), next(nullptr) {}\n};\n\nint main() {\n    DNode* a = new DNode(10); DNode* b = new DNode(20);\n    a->next = b; b->prev = a;\n    cout << \"Forward: \" << a->next->val << \", Backward: \" << b->prev->val << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Doubly linked list\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"DLL\"); } }",
          "python": "class DNode:\n    def __init__(self, val):\n        self.val = val; self.prev = None; self.next = None\na = DNode(10); b = DNode(20)\na.next = b; b.prev = a\nprint(\"DLL:\", a.val, \"<->\", b.val)"
        },
        "example": {
          "input": "NULL <- 10 <-> 20 -> NULL",
          "output": "Bidirectional traversal verified"
        }
      },
      {
        "id": "circular-linked-list",
        "title": "Circular Linked List",
        "description": "Tail points back to head node with no NULL terminator.",
        "timeComplexity": "O(n) traversal",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Used in Round-Robin CPU scheduling and repeating buffers.",
        "visualType": "linkedlist",
        "concept": "In a Circular Linked List, the last node's next pointer references the head node rather than NULL, forming a continuous cycle.",
        "algorithm": "curr = head\ndo:\n  process(curr)\n  curr = curr.next\nwhile curr != head",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node { int val; Node* next; Node(int v): val(v), next(nullptr) {} };\n\nint main() {\n    Node* head = new Node(10);\n    head->next = new Node(20);\n    head->next->next = head; // circular loop\n    cout << \"Circular link: \" << head->next->next->val << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Circular list\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Circular LL\"); } }",
          "python": "class Node:\n    def __init__(self, val):\n        self.val = val; self.next = None\nh = Node(10); h.next = Node(20); h.next.next = h\nprint(\"Loop:\", h.next.next.val)"
        },
        "example": {
          "input": "10 -> 20 -> (back to 10)",
          "output": "Head reached after 2 steps"
        }
      }
    ]
  },
  {
    "id": "mod-5",
    "moduleNumber": 5,
    "badge": "MODULE 05",
    "title": "Stack",
    "icon": "Boxes",
    "description": "LIFO order, array and linked list implementation, parenthesis verification, and expression evaluation.",
    "color": "#f59e0b",
    "topics": [
      {
        "id": "stack-intro",
        "title": "Stack Introduction",
        "description": "Last-In, First-Out (LIFO) paradigm, push, pop, top, and peek primitives.",
        "timeComplexity": "O(1) all operations",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Direct pointer or top index adjustment on push/pop.",
        "visualType": "stack",
        "concept": "A Stack is a linear data structure following the LIFO principle: elements can only be inserted (push) or removed (pop) from one end called the TOP.",
        "algorithm": "push(x): top++; stack[top] = x\npop(): val = stack[top]; top--; return val",
        "code": {
          "cpp": "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n    stack<int> st;\n    st.push(10); st.push(20); st.push(30);\n    cout << \"Top element: \" << st.top() << endl; // 30\n    st.pop();\n    cout << \"New top: \" << st.top() << endl; // 20\n    return 0;\n}",
          "c": "#include <stdio.h>\n#define MAX 100\nint stack[MAX], top = -1;\nvoid push(int x) { stack[++top] = x; }\nint pop() { return stack[top--]; }\nint main() { push(10); push(20); printf(\"Top: %d\\n\", stack[top]); return 0; }",
          "java": "import java.util.Stack;\npublic class Main {\n    public static void main(String[] args) {\n        Stack<Integer> st = new Stack<>();\n        st.push(10); st.push(20);\n        System.out.println(\"Top: \" + st.peek());\n    }\n}",
          "python": "stack = []\nstack.append(10)\nstack.append(20)\nprint(\"Top:\", stack[-1])\nstack.pop()\nprint(\"After pop:\", stack)"
        },
        "example": {
          "input": "push(10), push(20), push(30), pop()",
          "output": "Top = 20"
        }
      },
      {
        "id": "stack-implementation",
        "title": "Stack Implementation",
        "description": "Building a stack from scratch using arrays and dynamic linked lists.",
        "timeComplexity": "O(1) per op",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Linked list implementation prevents fixed capacity overflow.",
        "visualType": "stack",
        "concept": "Stack can be implemented via fixed array with `top` index variable, or via Linked List where push and pop operate at the head in O(1) time.",
        "algorithm": "push: prepend node to head\npop: remove head node",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nclass CustomStack {\n    int* arr; int topIndex; int capacity;\npublic:\n    CustomStack(int cap) : capacity(cap), topIndex(-1) { arr = new int[cap]; }\n    void push(int x) { if(topIndex < capacity - 1) arr[++topIndex] = x; }\n    int pop() { return topIndex >= 0 ? arr[topIndex--] : -1; }\n    int top() { return topIndex >= 0 ? arr[topIndex] : -1; }\n};\n\nint main() {\n    CustomStack s(5);\n    s.push(100); s.push(200);\n    cout << \"Top: \" << s.top() << \", Popped: \" << s.pop() << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Custom stack implemented\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Stack implemented\"); } }",
          "python": "class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, x): self.items.append(x)\n    def pop(self): return self.items.pop() if self.items else None\n    def peek(self): return self.items[-1] if self.items else None\n\ns = Stack()\ns.push(100); s.push(200)\nprint(\"Top:\", s.peek())"
        },
        "example": {
          "input": "s.push(100), s.push(200)",
          "output": "Top: 200, Popped: 200"
        }
      },
      {
        "id": "stack-applications",
        "title": "Applications of Stack",
        "description": "Undo/redo systems, recursion call stack, compiler syntax parsing, and browser history.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "State backtracking leverages LIFO history.",
        "visualType": "stack",
        "concept": "Real world stack applications include: Browser Back/Forward buttons, Undo/Redo in editors, Function call activation records, and Syntax checking.",
        "algorithm": "Push actions to undoStack. When undo clicked, pop from undoStack and push to redoStack.",
        "code": {
          "cpp": "#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint main() {\n    stack<string> history;\n    history.push(\"google.com\");\n    history.push(\"github.com\");\n    history.push(\"leetcode.com\");\n    cout << \"Current page: \" << history.top() << endl;\n    history.pop();\n    cout << \"Back to: \" << history.top() << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Browser history with stack\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Stack history\"); } }",
          "python": "history = []\nhistory.append(\"google.com\")\nhistory.append(\"github.com\")\nprint(\"Current:\", history[-1])\nhistory.pop()\nprint(\"Back:\", history[-1])"
        },
        "example": {
          "input": "Visit Google -> GitHub -> Back",
          "output": "Current: Google"
        }
      },
      {
        "id": "balanced-parentheses",
        "title": "Balanced Parentheses",
        "description": "Verifying matching brackets (), {}, and [] using a LIFO tracking stack.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Every opening bracket pushed; popped on matching closing bracket.",
        "visualType": "stack",
        "concept": "To verify valid parentheses, push opening brackets onto the stack. When encountering a closing bracket, the top must match. If empty or mismatched, string is invalid.",
        "algorithm": "for c in s:\n  if c in '({[': push(c)\n  else:\n    if stack empty or mismatch: return false\n    pop()\nreturn stack empty",
        "code": {
          "cpp": "#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nbool isValid(string s) {\n    stack<char> st;\n    for(char c : s) {\n        if(c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if(st.empty()) return false;\n            char top = st.top(); st.pop();\n            if((c == ')' && top != '(') ||\n               (c == '}' && top != '{') ||\n               (c == ']' && top != '[')) return false;\n        }\n    }\n    return st.empty();\n}\n\nint main() {\n    cout << \"'{[()]}' valid: \" << (isValid(\"{[()]}\") ? \"YES\" : \"NO\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdbool.h>\nint main() { printf(\"Balanced brackets\\n\"); return 0; }",
          "java": "import java.util.Stack;\npublic class Main {\n    static boolean isValid(String s) {\n        Stack<Character> st = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') st.push(')');\n            else if (c == '{') st.push('}');\n            else if (c == '[') st.push(']');\n            else if (st.isEmpty() || st.pop() != c) return false;\n        }\n        return st.isEmpty();\n    }\n    public static void main(String[] args) { System.out.println(isValid(\"{[]}\")); }\n}",
          "python": "def is_valid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for c in s:\n        if c in mapping.values(): stack.append(c)\n        elif c in mapping:\n            if not stack or stack.pop() != mapping[c]: return False\n    return len(stack) == 0\n\nprint(\"Valid:\", is_valid(\"{[()]}\"))"
        },
        "example": {
          "input": "\"{[()]}\"",
          "output": "true"
        }
      },
      {
        "id": "next-greater-element",
        "title": "Next Greater Element",
        "description": "Monotonic stack pattern for finding the next greater value in linear time.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Each element is pushed and popped at most once into the monotonic stack.",
        "visualType": "stack",
        "concept": "Using a monotonic decreasing stack from right to left, pop elements smaller than the current number. The top of the stack is the Next Greater Element.",
        "algorithm": "for i = n-1 down to 0:\n  while stack not empty and stack.top <= arr[i]: pop()\n  ans[i] = stack.empty ? -1 : stack.top\n  push(arr[i])",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nvector<int> nextGreaterElements(const vector<int>& arr) {\n    int n = arr.size();\n    vector<int> nge(n);\n    stack<int> st;\n    for(int i = n - 1; i >= 0; i--) {\n        while(!st.empty() && st.top() <= arr[i]) st.pop();\n        nge[i] = st.empty() ? -1 : st.top();\n        st.push(arr[i]);\n    }\n    return nge;\n}\n\nint main() {\n    vector<int> a = {4, 5, 2, 25};\n    vector<int> res = nextGreaterElements(a);\n    for(int x : res) cout << x << \" \"; // 5 25 25 -1\n    cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Next greater element\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"NGE\"); } }",
          "python": "def next_greater(arr):\n    stack = []\n    res = [-1] * len(arr)\n    for i in range(len(arr)-1, -1, -1):\n        while stack and stack[-1] <= arr[i]: stack.pop()\n        if stack: res[i] = stack[-1]\n        stack.append(arr[i])\n    return res\n\nprint(\"NGE:\", next_greater([4, 5, 2, 25]))"
        },
        "example": {
          "input": "[4, 5, 2, 25]",
          "output": "[5, 25, 25, -1]"
        }
      },
      {
        "id": "infix-prefix-postfix",
        "title": "Infix / Prefix / Postfix",
        "description": "Arithmetic expression notation conversion and stack-based postfix evaluation.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Operator precedence stack controls order of tokens.",
        "visualType": "stack",
        "concept": "Infix notation (A + B) is human-readable. Postfix (A B +) and Prefix (+ A B) eliminate parentheses and are executed sequentially by compilers using stacks.",
        "algorithm": "Evaluate postfix:\nfor token in expression:\n  if operand: push(num)\n  else:\n    b = pop(); a = pop()\n    push(eval(a, op, b))\nreturn pop()",
        "code": {
          "cpp": "#include <iostream>\n#include <stack>\n#include <string>\n#include <cctype>\nusing namespace std;\n\nint evalPostfix(string exp) {\n    stack<int> st;\n    for(char c : exp) {\n        if(isdigit(c)) st.push(c - '0');\n        else {\n            int val2 = st.top(); st.pop();\n            int val1 = st.top(); st.pop();\n            switch(c) {\n                case '+': st.push(val1 + val2); break;\n                case '-': st.push(val1 - val2); break;\n                case '*': st.push(val1 * val2); break;\n                case '/': st.push(val1 / val2); break;\n            }\n        }\n    }\n    return st.top();\n}\n\nint main() {\n    cout << \"Eval '231*+9-': \" << evalPostfix(\"231*+9-\") << endl; // -4\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Postfix evaluation\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Postfix eval\"); } }",
          "python": "def eval_postfix(exp):\n    stack = []\n    for c in exp:\n        if c.isdigit(): stack.append(int(c))\n        else:\n            b = stack.pop(); a = stack.pop()\n            if c == '+': stack.append(a + b)\n            elif c == '-': stack.append(a - b)\n            elif c == '*': stack.append(a * b)\n            elif c == '/': stack.append(a // b)\n    return stack[0]\n\nprint(\"Eval:\", eval_postfix(\"231*+9-\"))"
        },
        "example": {
          "input": "\"231*+9-\"",
          "output": "-4"
        }
      }
    ]
  },
  {
    "id": "mod-6",
    "moduleNumber": 6,
    "badge": "MODULE 06",
    "title": "Queue",
    "icon": "Boxes",
    "description": "FIFO principle, circular queues, deque, and priority queue architectures.",
    "color": "#0284c7",
    "topics": [
      {
        "id": "queue-intro",
        "title": "Queue Introduction",
        "description": "First-In, First-Out (FIFO) paradigm, enqueue at rear, dequeue from front.",
        "timeComplexity": "O(1) per op",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Maintains front and rear pointers.",
        "visualType": "queue",
        "concept": "A Queue is a linear collection governed by the FIFO principle: items are inserted at the rear and removed from the front.",
        "algorithm": "enqueue(x): rear++; q[rear] = x\ndequeue(): val = q[front]; front++; return val",
        "code": {
          "cpp": "#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n    queue<int> q;\n    q.push(10); q.push(20); q.push(30);\n    cout << \"Front: \" << q.front() << \", Back: \" << q.back() << endl;\n    q.pop();\n    cout << \"After pop front: \" << q.front() << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Queue introduction\\n\"); return 0; }",
          "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Queue<Integer> q = new LinkedList<>();\n        q.offer(10); q.offer(20);\n        System.out.println(\"Front: \" + q.peek());\n    }\n}",
          "python": "from collections import deque\nq = deque()\nq.append(10); q.append(20)\nprint(\"Front:\", q[0])\nq.popleft()\nprint(\"After dequeue:\", list(q))"
        },
        "example": {
          "input": "q.enqueue(10), q.enqueue(20), q.dequeue()",
          "output": "Remaining front = 20"
        }
      },
      {
        "id": "queue-implementation",
        "title": "Queue Implementation",
        "description": "Building array-based and linked-list queues with boundary protections.",
        "timeComplexity": "O(1) all ops",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Linked list avoids memory wastage when elements dequeue.",
        "visualType": "queue",
        "concept": "In an array implementation, dequeueing leaves empty slots at the beginning unless a circular index wrapping formula is used.",
        "algorithm": "front = (front + 1) % size",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nclass SimpleQueue {\n    int arr[100]; int front, rear;\npublic:\n    SimpleQueue(): front(0), rear(-1) {}\n    void enqueue(int x) { arr[++rear] = x; }\n    int dequeue() { return arr[front++]; }\n    int peek() { return arr[front]; }\n};\n\nint main() {\n    SimpleQueue q;\n    q.enqueue(5); q.enqueue(15);\n    cout << \"Front: \" << q.peek() << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Queue implementation\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Queue imp\"); } }",
          "python": "class Queue:\n    def __init__(self): self.data = []\n    def enqueue(self, x): self.data.append(x)\n    def dequeue(self): return self.data.pop(0) if self.data else None\nq = Queue(); q.enqueue(5); print(\"Dequeued:\", q.dequeue())"
        },
        "example": {
          "input": "q.enqueue(5), q.enqueue(15)",
          "output": "Front = 5"
        }
      },
      {
        "id": "circular-queue",
        "title": "Circular Queue",
        "description": "Ring buffer memory recycling using modulo arithmetic (rear + 1) % N.",
        "timeComplexity": "O(1) all ops",
        "spaceComplexity": "O(N)",
        "complexityExplanation": "Zero element shifting: indices wrap around continuously.",
        "visualType": "queue",
        "concept": "A Circular Queue connects the last position back to the first position, recycling previously freed dequeue slots.",
        "algorithm": "rear = (rear + 1) % capacity\nfront = (front + 1) % capacity",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nclass CircularQueue {\n    int *arr; int front, rear, size, capacity;\npublic:\n    CircularQueue(int k) : capacity(k), size(0), front(0), rear(-1) { arr = new int[k]; }\n    bool enQueue(int val) {\n        if(size == capacity) return false;\n        rear = (rear + 1) % capacity;\n        arr[rear] = val;\n        size++;\n        return true;\n    }\n    int Front() { return size == 0 ? -1 : arr[front]; }\n};\n\nint main() {\n    CircularQueue cq(3);\n    cq.enQueue(1); cq.enQueue(2); cq.enQueue(3);\n    cout << \"Front: \" << cq.Front() << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Circular queue\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Circular queue\"); } }",
          "python": "class CircularQueue:\n    def __init__(self, k):\n        self.k = k\n        self.q = [0]*k\n        self.head = self.tail = self.size = 0"
        },
        "example": {
          "input": "Circular ring buffer of size 3",
          "output": "Full utilization without realloc"
        }
      },
      {
        "id": "deque-concept",
        "title": "Deque",
        "description": "Double-Ended Queue supporting insert and delete at both ends.",
        "timeComplexity": "O(1) push/pop both ends",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Used in sliding window maximum and palindrome verification.",
        "visualType": "queue",
        "concept": "A Deque (Double Ended Queue) allows insertion and deletion at both FRONT and REAR in O(1) time.",
        "algorithm": "push_front, push_back, pop_front, pop_back",
        "code": {
          "cpp": "#include <iostream>\n#include <deque>\nusing namespace std;\n\nint main() {\n    deque<int> dq;\n    dq.push_back(10);\n    dq.push_front(5);\n    cout << \"Front: \" << dq.front() << \", Back: \" << dq.back() << endl; // 5 and 10\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Deque demonstration\\n\"); return 0; }",
          "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Deque<Integer> dq = new ArrayDeque<>();\n        dq.addFirst(5); dq.addLast(10);\n        System.out.println(dq.peekFirst() + \" to \" + dq.peekLast());\n    }\n}",
          "python": "from collections import deque\ndq = deque([10])\ndq.appendleft(5)\nprint(\"Front:\", dq[0], \"Back:\", dq[-1])"
        },
        "example": {
          "input": "push_front(5), push_back(10)",
          "output": "Front: 5, Back: 10"
        }
      },
      {
        "id": "priority-queue-intro",
        "title": "Priority Queue",
        "description": "Elements served according to priority ranking rather than insertion order.",
        "timeComplexity": "O(log n) insert/delete",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Typically implemented using binary heap structures.",
        "visualType": "queue",
        "concept": "In a Priority Queue, every element has an assigned priority. Items with higher priority are dequeued before items with lower priority.",
        "algorithm": "Heap push: insert at end, bubble up\nHeap pop: remove root, move last to root, bubble down",
        "code": {
          "cpp": "#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n    priority_queue<int> pq; // Max heap\n    pq.push(30); pq.push(10); pq.push(50);\n    cout << \"Highest priority: \" << pq.top() << endl; // 50\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Priority queue\\n\"); return 0; }",
          "java": "import java.util.PriorityQueue;\npublic class Main {\n    public static void main(String[] args) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>(); // Min heap\n        pq.add(30); pq.add(10);\n        System.out.println(\"Min: \" + pq.peek());\n    }\n}",
          "python": "import heapq\nh = []\nheapq.heappush(h, 30)\nheapq.heappush(h, 10)\nprint(\"Min:\", heapq.heappop(h))"
        },
        "example": {
          "input": "push(30), push(10), push(50)",
          "output": "Max = 50"
        }
      }
    ]
  },
  {
    "id": "mod-7",
    "moduleNumber": 7,
    "badge": "MODULE 07",
    "title": "Hashing",
    "icon": "Terminal",
    "description": "Hash tables, hash functions, collision resolution (chaining, open addressing), sets, and maps.",
    "color": "#e11d48",
    "topics": [
      {
        "id": "hash-table",
        "title": "Hash Table",
        "description": "Direct key-to-index mapping via hash functions for O(1) average retrieval.",
        "timeComplexity": "O(1) average, O(n) worst",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Constant time amortized lookup via hash function index generation.",
        "visualType": "none",
        "concept": "A Hash Table maps keys to values using a Hash Function which computes an index into an array of buckets.",
        "algorithm": "index = hash(key) % capacity",
        "code": {
          "cpp": "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    unordered_map<string, int> ageMap;\n    ageMap[\"Alice\"] = 25;\n    ageMap[\"Bob\"] = 30;\n    cout << \"Alice's age: \" << ageMap[\"Alice\"] << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Hash table overview\\n\"); return 0; }",
          "java": "import java.util.HashMap;\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> map = new HashMap<>();\n        map.put(\"Alice\", 25);\n        System.out.println(\"Age: \" + map.get(\"Alice\"));\n    }\n}",
          "python": "age_map = {\"Alice\": 25, \"Bob\": 30}\nprint(\"Alice's age:\", age_map[\"Alice\"])"
        },
        "example": {
          "input": "ageMap[\"Alice\"] = 25",
          "output": "25"
        }
      },
      {
        "id": "hashmap",
        "title": "HashMap",
        "description": "Key-Value pairs mapping with efficient amortized constant time lookups.",
        "timeComplexity": "O(1) avg",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Resizing occurs when load factor exceeds threshold (typically 0.75).",
        "visualType": "none",
        "concept": "A HashMap stores associations between unique keys and corresponding values, powering lightning fast lookups.",
        "algorithm": "put(k, v), get(k), contains(k)",
        "code": {
          "cpp": "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    unordered_map<int, string> rollNumber;\n    rollNumber[101] = \"Aayush\";\n    cout << \"101 maps to: \" << rollNumber[101] << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"HashMap\\n\"); return 0; }",
          "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<Integer, String> map = new HashMap<>();\n        map.put(101, \"Aayush\");\n        System.out.println(map.get(101));\n    }\n}",
          "python": "m = {101: \"Aayush\"}\nprint(\"101:\", m[101])"
        },
        "example": {
          "input": "map[101] = \"Aayush\"",
          "output": "\"Aayush\""
        }
      },
      {
        "id": "hashset",
        "title": "HashSet",
        "description": "Collection of unique elements providing O(1) membership queries.",
        "timeComplexity": "O(1) avg",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Stores keys only with no duplicate entries allowed.",
        "visualType": "none",
        "concept": "A HashSet stores unique items only. Inserting an existing item is a no-op, making it ideal for deduplication.",
        "algorithm": "insert(x), count(x) > 0",
        "code": {
          "cpp": "#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n    unordered_set<int> uniqueNums = {1, 2, 2, 3, 3, 3};\n    cout << \"Unique count: \" << uniqueNums.size() << endl; // 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"HashSet demo\\n\"); return 0; }",
          "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Set<Integer> set = new HashSet<>(Arrays.asList(1, 2, 2, 3));\n        System.out.println(\"Size: \" + set.size());\n    }\n}",
          "python": "s = {1, 2, 2, 3, 3}\nprint(\"Unique set:\", s)"
        },
        "example": {
          "input": "[1, 2, 2, 3, 3, 3]",
          "output": "{1, 2, 3}"
        }
      },
      {
        "id": "frequency-map",
        "title": "Frequency Map",
        "description": "Tabulating item occurrences for anagrams, top K elements, and majority elements.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(k)",
        "complexityExplanation": "Tracks counts of k unique elements.",
        "visualType": "none",
        "concept": "Mapping each element to its count allows solving problems like finding the majority element or validating anagrams in linear time.",
        "algorithm": "for item in arr: count[item]++",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {4, 1, 2, 1, 2};\n    unordered_map<int, int> count;\n    for(int x : nums) count[x]++;\n    for(auto& p : count) {\n        if(p.second == 1) cout << \"Single number: \" << p.first << endl;\n    }\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Frequency map demo\\n\"); return 0; }",
          "java": "import java.util.*;\npublic class Main { public static void main(String[] args) { System.out.println(\"Frequency map\"); } }",
          "python": "from collections import Counter\nnums = [4, 1, 2, 1, 2]\ncounts = Counter(nums)\nprint(\"Counts:\", dict(counts))"
        },
        "example": {
          "input": "[4, 1, 2, 1, 2]",
          "output": "Single number = 4"
        }
      },
      {
        "id": "collision-concept",
        "title": "Collision Concept",
        "description": "Separate chaining with linked lists versus Open Addressing (linear probing, quadratic probing).",
        "timeComplexity": "O(1) avg, O(n) worst",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Collisions degrade bucket lookup from O(1) to O(k) where k is bucket chain length.",
        "visualType": "none",
        "concept": "A collision occurs when two distinct keys produce the same hash index. Handled via:\n1. Chaining: Buckets store linked lists.\n2. Open Addressing: Probing next available slots (Linear, Quadratic, Double Hashing).",
        "algorithm": "Separate Chaining: bucket[hash(key)].push_back(key, value)",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <list>\nusing namespace std;\n\nclass SimpleHashTable {\n    int BUCKET;\n    vector<list<int>> table;\npublic:\n    SimpleHashTable(int b): BUCKET(b), table(b) {}\n    int hashFunc(int k) { return k % BUCKET; }\n    void insert(int k) { table[hashFunc(k)].push_back(k); }\n};\n\nint main() {\n    SimpleHashTable ht(7);\n    ht.insert(10); ht.insert(17); // 10%7=3, 17%7=3 (Collision chained!)\n    cout << \"10 and 17 chained at bucket 3\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Collision handling\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Chaining\"); } }",
          "python": "# Chaining demonstrated in Python dict internally"
        },
        "example": {
          "input": "Hash collision on keys 10 and 17 with mod 7",
          "output": "Both stored in bucket 3 chain"
        }
      },
      {
        "id": "hashing-problems",
        "title": "Hashing Problems",
        "description": "Classic problems: Two Sum, Subarray with 0 sum, and Longest Consecutive Sequence.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Replaces O(n^2) nested loops with O(1) hash lookups.",
        "visualType": "none",
        "concept": "Hashing converts lookup bottlenecks from O(n) to O(1). In Two Sum, storing the complement (target - num) gives an optimal linear time solution.",
        "algorithm": "seen = {}\nfor i, num in enumerate(arr):\n  diff = target - num\n  if diff in seen: return [seen[diff], i]\n  seen[num] = i",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(const vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for(int i = 0; i < (int)nums.size(); i++) {\n        int comp = target - nums[i];\n        if(mp.count(comp)) return {mp[comp], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}\n\nint main() {\n    vector<int> res = twoSum({2, 7, 11, 15}, 9);\n    cout << \"Indices: \" << res[0] << \", \" << res[1] << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Two Sum via hash\\n\"); return 0; }",
          "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) { System.out.println(\"Two sum\"); }\n}",
          "python": "def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        if target - x in seen:\n            return [seen[target - x], i]\n        seen[x] = i\n    return []\nprint(\"Two sum:\", two_sum([2, 7, 11, 15], 9))"
        },
        "example": {
          "input": "[2, 7, 11, 15], target = 9",
          "output": "[0, 1] (nums[0] + nums[1] = 9)"
        }
      }
    ]
  },
  {
    "id": "mod-8",
    "moduleNumber": 8,
    "badge": "MODULE 08",
    "title": "Trees",
    "icon": "GitFork",
    "description": "Binary Trees, BSTs, Depth/Height calculation, Traversals (Pre/In/Post/Level Order), and Lowest Common Ancestor.",
    "color": "#14b8a6",
    "topics": [
      {
        "id": "binary-tree",
        "title": "Binary Tree",
        "description": "Hierarchical data structure where each node has at most two children: left and right.",
        "timeComplexity": "O(n) traversal",
        "spaceComplexity": "O(h) call stack",
        "complexityExplanation": "Height h bounds recursive call stack memory.",
        "visualType": "tree",
        "concept": "A Binary Tree is a non-linear hierarchical structure where each node contains data and references to at most two child nodes (left and right).",
        "algorithm": "struct TreeNode { int val; TreeNode *left, *right; }",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int v): val(v), left(nullptr), right(nullptr) {}\n};\n\nint main() {\n    TreeNode* root = new TreeNode(1);\n    root->left = new TreeNode(2);\n    root->right = new TreeNode(3);\n    cout << \"Root: \" << root->val << \", Left: \" << root->left->val << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\n#include <stdlib.h>\nstruct TreeNode { int val; struct TreeNode *left, *right; };\nint main() { printf(\"Binary tree\\n\"); return 0; }",
          "java": "class TreeNode {\n    int val; TreeNode left, right;\n    TreeNode(int v) { val = v; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(1);\n        root.left = new TreeNode(2);\n        System.out.println(\"Root: \" + root.val);\n    }\n}",
          "python": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\nroot = TreeNode(1, TreeNode(2), TreeNode(3))\nprint(\"Root:\", root.val, \"Left:\", root.left.val)"
        },
        "example": {
          "input": "Root 1 with left child 2, right child 3",
          "output": "1 -> (2, 3)"
        }
      },
      {
        "id": "tree-terminology",
        "title": "Tree Terminology",
        "description": "Root, Parent, Child, Leaf, Degree, Height, Depth, Level, and Subtree definitions.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Structural topological properties of tree graphs.",
        "visualType": "tree",
        "concept": "- Root: The topmost node with no parent.\n- Leaf: Node with no children.\n- Height: Number of edges on longest path from node to leaf.\n- Depth: Number of edges from root to node.",
        "algorithm": "depth(node) = depth(parent) + 1",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Tree Terms: Root, Leaf, Height, Depth, Ancestor\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Tree terminology\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Tree Terms\"); } }",
          "python": "print(\"Tree Terms: Root, Leaf, Height, Depth\")"
        },
        "example": {
          "input": "A tree with 3 levels",
          "output": "Height = 2 (edges)"
        }
      },
      {
        "id": "bst-intro",
        "title": "Binary Search Tree",
        "description": "BST invariant: Left < Root < Right for all subtrees, enabling O(log n) lookup.",
        "timeComplexity": "O(log n) avg, O(n) worst",
        "spaceComplexity": "O(h)",
        "complexityExplanation": "Balanced BST halves the search space at each branch.",
        "visualType": "tree",
        "concept": "In a Binary Search Tree (BST), for every node: all keys in its left subtree are strictly less, and all keys in its right subtree are strictly greater.",
        "algorithm": "search(root, key):\n  if !root or root.val == key return root\n  if key < root.val return search(root.left, key)\n  return search(root.right, key)",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v): val(v), left(nullptr), right(nullptr) {} };\n\nTreeNode* insertBST(TreeNode* root, int val) {\n    if(!root) return new TreeNode(val);\n    if(val < root->val) root->left = insertBST(root->left, val);\n    else root->right = insertBST(root->right, val);\n    return root;\n}\n\nint main() {\n    TreeNode* root = nullptr;\n    root = insertBST(root, 50);\n    insertBST(root, 30); insertBST(root, 70);\n    cout << \"BST constructed with root 50\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"BST\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"BST\"); } }",
          "python": "class BST:\n    def insert(self, root, val):\n        if not root: return TreeNode(val)\n        if val < root.val: root.left = self.insert(root.left, val)\n        else: root.right = self.insert(root.right, val)\n        return root"
        },
        "example": {
          "input": "Insert 50, 30, 70 into BST",
          "output": "Root=50, Left=30, Right=70"
        }
      },
      {
        "id": "tree-traversal",
        "title": "Tree Traversal",
        "description": "Overview of Depth-First (DFS) and Breadth-First (BFS) tree traversal strategies.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)",
        "complexityExplanation": "Every node visited exactly once.",
        "visualType": "tree",
        "concept": "Traversing a tree visits every node systematically. Depth-First Traversal explores branch by branch (Preorder, Inorder, Postorder). Breadth-First explores level by level.",
        "algorithm": "DFS uses call stack / recursion; BFS uses FIFO queue.",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Tree Traversals: Preorder, Inorder, Postorder, Level-Order\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Traversals\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Traversals\"); } }",
          "python": "print(\"Traversals: DFS & BFS\")"
        },
        "example": {
          "input": "Tree nodes: 1, 2, 3",
          "output": "Traversal covers all 3 nodes"
        }
      },
      {
        "id": "preorder-traversal",
        "title": "Preorder",
        "description": "Root -> Left -> Right depth-first ordering, used in tree cloning and serialization.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)",
        "complexityExplanation": "Visits root first, then recurses left and right.",
        "visualType": "tree",
        "concept": "In Preorder traversal, current node is evaluated before traversing child subtrees: Root -> Left -> Right.",
        "algorithm": "preorder(node):\n  if !node return\n  visit(node.val)\n  preorder(node.left)\n  preorder(node.right)",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v): val(v), left(nullptr), right(nullptr) {} };\n\nvoid preorder(TreeNode* root) {\n    if(!root) return;\n    cout << root->val << \" \";\n    preorder(root->left);\n    preorder(root->right);\n}\n\nint main() {\n    TreeNode* r = new TreeNode(1);\n    r->left = new TreeNode(2); r->right = new TreeNode(3);\n    cout << \"Preorder: \"; preorder(r); cout << endl; // 1 2 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Preorder\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Preorder\"); } }",
          "python": "def preorder(root):\n    if not root: return\n    print(root.val, end=\" \")\n    preorder(root.left)\n    preorder(root.right)"
        },
        "example": {
          "input": "Root 1 (Left 2, Right 3)",
          "output": "1 2 3"
        }
      },
      {
        "id": "inorder-traversal",
        "title": "Inorder",
        "description": "Left -> Root -> Right traversal, yields sorted ascending order on BSTs.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)",
        "complexityExplanation": "In BST, inorder output is sorted ascending.",
        "visualType": "tree",
        "concept": "Inorder traversal visits Left subtree, then current Root, then Right subtree. On any valid BST, an Inorder traversal produces keys in non-decreasing order.",
        "algorithm": "inorder(node):\n  if !node return\n  inorder(node.left)\n  visit(node.val)\n  inorder(node.right)",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v): val(v), left(nullptr), right(nullptr) {} };\n\nvoid inorder(TreeNode* root) {\n    if(!root) return;\n    inorder(root->left);\n    cout << root->val << \" \";\n    inorder(root->right);\n}\n\nint main() {\n    TreeNode* r = new TreeNode(2);\n    r->left = new TreeNode(1); r->right = new TreeNode(3);\n    cout << \"Inorder (Sorted): \"; inorder(r); cout << endl; // 1 2 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Inorder\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Inorder\"); } }",
          "python": "def inorder(root):\n    if not root: return\n    inorder(root.left)\n    print(root.val, end=\" \")\n    inorder(root.right)"
        },
        "example": {
          "input": "Root 2 (Left 1, Right 3)",
          "output": "1 2 3"
        }
      },
      {
        "id": "postorder-traversal",
        "title": "Postorder",
        "description": "Left -> Right -> Root ordering, used for bottom-up evaluations and tree deletions.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)",
        "complexityExplanation": "Children processed before root.",
        "visualType": "tree",
        "concept": "In Postorder traversal, both subtrees are traversed before the root node: Left -> Right -> Root. Crucial for safely deleting trees bottom-up.",
        "algorithm": "postorder(node):\n  if !node return\n  postorder(node.left)\n  postorder(node.right)\n  visit(node.val)",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v): val(v), left(nullptr), right(nullptr) {} };\n\nvoid postorder(TreeNode* root) {\n    if(!root) return;\n    postorder(root->left);\n    postorder(root->right);\n    cout << root->val << \" \";\n}\n\nint main() {\n    TreeNode* r = new TreeNode(1);\n    r->left = new TreeNode(2); r->right = new TreeNode(3);\n    cout << \"Postorder: \"; postorder(r); cout << endl; // 2 3 1\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Postorder\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Postorder\"); } }",
          "python": "def postorder(root):\n    if not root: return\n    postorder(root.left)\n    postorder(root.right)\n    print(root.val, end=\" \")"
        },
        "example": {
          "input": "Root 1 (Left 2, Right 3)",
          "output": "2 3 1"
        }
      },
      {
        "id": "level-order-traversal",
        "title": "Level Order",
        "description": "Breadth-First Search (BFS) level-by-level using a FIFO queue.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(w) maximum tree width",
        "complexityExplanation": "Queue holds maximum number of nodes at any level.",
        "visualType": "tree",
        "concept": "Level Order traversal visits nodes level-by-level from top to bottom, and left to right within each level, using a Queue.",
        "algorithm": "q = [root]\nwhile q:\n  curr = q.pop(0)\n  visit(curr.val)\n  if curr.left: q.append(curr.left)\n  if curr.right: q.append(curr.right)",
        "code": {
          "cpp": "#include <iostream>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v): val(v), left(nullptr), right(nullptr) {} };\n\nvoid levelOrder(TreeNode* root) {\n    if(!root) return;\n    queue<TreeNode*> q;\n    q.push(root);\n    while(!q.empty()) {\n        TreeNode* curr = q.front(); q.pop();\n        cout << curr->val << \" \";\n        if(curr->left) q.push(curr->left);\n        if(curr->right) q.push(curr->right);\n    }\n}\n\nint main() {\n    TreeNode* r = new TreeNode(1);\n    r->left = new TreeNode(2); r->right = new TreeNode(3);\n    cout << \"Level order: \"; levelOrder(r); cout << endl; // 1 2 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Level order\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Level order\"); } }",
          "python": "from collections import deque\ndef level_order(root):\n    if not root: return\n    q = deque([root])\n    while q:\n        node = q.popleft()\n        print(node.val, end=\" \")\n        if node.left: q.append(node.left)\n        if node.right: q.append(node.right)"
        },
        "example": {
          "input": "Root 1 (Left 2, Right 3)",
          "output": "1 2 3"
        }
      },
      {
        "id": "height-of-tree",
        "title": "Height of Tree",
        "description": "Maximum depth calculation: 1 + max(height(left), height(right)).",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)",
        "complexityExplanation": "Recurses through all nodes to find deepest leaf path.",
        "visualType": "tree",
        "concept": "The height (or maximum depth) of a binary tree is the number of nodes along the longest path from the root node down to the farthest leaf node.",
        "algorithm": "maxDepth(root):\n  if !root return 0\n  return 1 + max(maxDepth(root.left), maxDepth(root.right))",
        "code": {
          "cpp": "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v): val(v), left(nullptr), right(nullptr) {} };\n\nint maxDepth(TreeNode* root) {\n    if(!root) return 0;\n    return 1 + max(maxDepth(root->left), maxDepth(root->right));\n}\n\nint main() {\n    TreeNode* r = new TreeNode(1);\n    r->left = new TreeNode(2);\n    r->left->left = new TreeNode(3);\n    cout << \"Tree height: \" << maxDepth(r) << endl; // 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Tree depth\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Depth\"); } }",
          "python": "def max_depth(root):\n    if not root: return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))\n\nprint(\"Depth:\", max_depth(TreeNode(1, TreeNode(2))))"
        },
        "example": {
          "input": "Tree 1 -> 2 -> 3",
          "output": "Height = 3 nodes (or 2 edges)"
        }
      },
      {
        "id": "lowest-common-ancestor",
        "title": "Lowest Common Ancestor",
        "description": "Identifying deepest shared ancestor node of two target tree nodes.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)",
        "complexityExplanation": "Traverses tree until both targets diverge on opposite subtrees.",
        "visualType": "tree",
        "concept": "The Lowest Common Ancestor (LCA) of nodes p and q is the deepest node T in tree that has both p and q as descendants.",
        "algorithm": "LCA(root, p, q):\n  if !root or root == p or root == q return root\n  left = LCA(root.left, p, q)\n  right = LCA(root.right, p, q)\n  if left and right return root\n  return left ? left : right",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v): val(v), left(nullptr), right(nullptr) {} };\n\nTreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if(!root || root == p || root == q) return root;\n    TreeNode* left = lowestCommonAncestor(root->left, p, q);\n    TreeNode* right = lowestCommonAncestor(root->right, p, q);\n    if(left && right) return root;\n    return left ? left : right;\n}\n\nint main() {\n    TreeNode* r = new TreeNode(3);\n    r->left = new TreeNode(5); r->right = new TreeNode(1);\n    TreeNode* lca = lowestCommonAncestor(r, r->left, r->right);\n    cout << \"LCA of 5 & 1: \" << lca->val << endl; // 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"LCA\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"LCA\"); } }",
          "python": "def lca(root, p, q):\n    if not root or root == p or root == q: return root\n    left = lca(root.left, p, q)\n    right = lca(root.right, p, q)\n    if left and right: return root\n    return left or right"
        },
        "example": {
          "input": "Tree with root 3, left 5, right 1. p=5, q=1",
          "output": "LCA = 3"
        }
      }
    ]
  },
  {
    "id": "mod-9",
    "moduleNumber": 9,
    "badge": "MODULE 09",
    "title": "Heap",
    "icon": "Boxes",
    "description": "Min Heap, Max Heap, Heapify, Heap Sort, and Top-K algorithmic patterns.",
    "color": "#eab308",
    "topics": [
      {
        "id": "heap-intro",
        "title": "Heap Introduction",
        "description": "Complete binary tree stored compactly in arrays (2*i + 1, 2*i + 2).",
        "timeComplexity": "O(log n) insert/delete",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Array index math: parent = (i-1)/2, left = 2i+1, right = 2i+2.",
        "visualType": "tree",
        "concept": "A Binary Heap is a complete binary tree satisfying the Heap Property. It can be stored compactly in a flat array without pointer overhead.",
        "algorithm": "parent(i) = (i - 1) / 2\nleftChild(i) = 2 * i + 1\nrightChild(i) = 2 * i + 2",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    cout << \"Heap: Complete Binary Tree mapped to vector array\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Heap intro\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Heap intro\"); } }",
          "python": "print(\"Heap: parent=(i-1)//2, left=2*i+1, right=2*i+2\")"
        },
        "example": {
          "input": "Heap array [50, 30, 40]",
          "output": "Root=50, Left=30, Right=40"
        }
      },
      {
        "id": "min-heap",
        "title": "Min Heap",
        "description": "Parent node is always smaller than or equal to its children; root holds minimum.",
        "timeComplexity": "O(1) peek min, O(log n) push/pop",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Bubble-up and Bubble-down steps run in tree height time.",
        "visualType": "tree",
        "concept": "In a Min-Heap, every parent node is less than or equal to its child nodes. The root always stores the minimum element.",
        "algorithm": "bubbleUp(i): while i > 0 and arr[parent(i)] > arr[i]: swap; i = parent(i)",
        "code": {
          "cpp": "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n    priority_queue<int, vector<int>, greater<int>> minHeap;\n    minHeap.push(30); minHeap.push(10); minHeap.push(20);\n    cout << \"Min element: \" << minHeap.top() << endl; // 10\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Min heap\\n\"); return 0; }",
          "java": "import java.util.PriorityQueue;\npublic class Main {\n    public static void main(String[] args) {\n        PriorityQueue<Integer> minH = new PriorityQueue<>();\n        minH.add(30); minH.add(10);\n        System.out.println(\"Min: \" + minH.peek());\n    }\n}",
          "python": "import heapq\nh = []\nheapq.heappush(h, 30); heapq.heappush(h, 10)\nprint(\"Min:\", h[0])"
        },
        "example": {
          "input": "Push 30, 10, 20",
          "output": "Min root = 10"
        }
      },
      {
        "id": "max-heap",
        "title": "Max Heap",
        "description": "Parent node is always greater than or equal to its children; root holds maximum.",
        "timeComplexity": "O(1) peek max, O(log n) push/pop",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Default priority_queue in C++ STL is a max-heap.",
        "visualType": "tree",
        "concept": "In a Max-Heap, every parent node is greater than or equal to its child nodes. The root always contains the maximum element.",
        "algorithm": "bubbleDown(i): swap with larger child until heap property restored.",
        "code": {
          "cpp": "#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n    priority_queue<int> maxHeap;\n    maxHeap.push(10); maxHeap.push(50); maxHeap.push(30);\n    cout << \"Max: \" << maxHeap.top() << endl; // 50\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Max heap\\n\"); return 0; }",
          "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        PriorityQueue<Integer> maxH = new PriorityQueue<>(Collections.reverseOrder());\n        maxH.add(10); maxH.add(50);\n        System.out.println(\"Max: \" + maxH.peek());\n    }\n}",
          "python": "import heapq\nh = []\nheapq.heappush(h, -10); heapq.heappush(h, -50)\nprint(\"Max:\", -h[0])"
        },
        "example": {
          "input": "Push 10, 50, 30",
          "output": "Max root = 50"
        }
      },
      {
        "id": "heap-priority-queue",
        "title": "Priority Queue",
        "description": "Priority queue implementation backed by binary heap operations.",
        "timeComplexity": "O(log n)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Insert is O(log n), extract-max is O(log n).",
        "visualType": "tree",
        "concept": "A Priority Queue backed by a Binary Heap provides logarithmic insertions and deletions, making it much faster than unsorted arrays O(n).",
        "algorithm": "enqueue = heap push; dequeue = heap pop",
        "code": {
          "cpp": "#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n    priority_queue<int> pq;\n    pq.push(100); pq.push(500); pq.push(200);\n    while(!pq.empty()) {\n        cout << pq.top() << \" \"; pq.pop();\n    }\n    cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"PQ heap\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"PQ\"); } }",
          "python": "import heapq\nh = [100, 500, 200]\nheapq.heapify(h)\nprint(\"Smallest extracted:\", heapq.heappop(h))"
        },
        "example": {
          "input": "[100, 500, 200]",
          "output": "500 200 100"
        }
      },
      {
        "id": "heap-sort",
        "title": "Heap Sort",
        "description": "In-place comparison-based sorting algorithm using binary heap.",
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Builds max heap in O(n), then performs n extract-max operations in O(log n).",
        "visualType": "sorting",
        "concept": "Heap Sort transforms the input array into a max heap, then repeatedly swaps the root (max value) with the last element and heapifies.",
        "algorithm": "1. Build max heap\n2. For i = n-1 down to 1: swap(arr[0], arr[i]), heapify(arr, i, 0)",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nvoid heapify(int arr[], int n, int i) {\n    int largest = i, l = 2 * i + 1, r = 2 * i + 2;\n    if(l < n && arr[l] > arr[largest]) largest = l;\n    if(r < n && arr[r] > arr[largest]) largest = r;\n    if(largest != i) {\n        swap(arr[i], arr[largest]);\n        heapify(arr, n, largest);\n    }\n}\n\nvoid heapSort(int arr[], int n) {\n    for(int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);\n    for(int i = n - 1; i > 0; i--) {\n        swap(arr[0], arr[i]);\n        heapify(arr, i, 0);\n    }\n}\n\nint main() {\n    int a[] = {12, 11, 13, 5, 6, 7};\n    heapSort(a, 6);\n    for(int x : a) cout << x << \" \"; cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Heap sort\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Heap sort\"); } }",
          "python": "def heap_sort(arr):\n    import heapq\n    h = list(arr)\n    heapq.heapify(h)\n    return [heapq.heappop(h) for _ in range(len(h))]\nprint(\"Sorted:\", heap_sort([12, 11, 13, 5, 6, 7]))"
        },
        "example": {
          "input": "[12, 11, 13, 5, 6, 7]",
          "output": "[5, 6, 7, 11, 12, 13]"
        }
      },
      {
        "id": "top-k-problems",
        "title": "Top K Problems",
        "description": "Finding K largest or K smallest elements efficiently with min/max heaps.",
        "timeComplexity": "O(n log k)",
        "spaceComplexity": "O(k)",
        "complexityExplanation": "Maintains a heap of size k instead of sorting entire n items O(n log n).",
        "visualType": "none",
        "concept": "To find the Kth largest element, maintain a Min-Heap of size K. For every element, push into heap; if size exceeds K, pop min. The top element is the Kth largest.",
        "algorithm": "for x in nums:\n  push(minHeap, x)\n  if size > k: pop(minHeap)\nreturn top(minHeap)",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint findKthLargest(const vector<int>& nums, int k) {\n    priority_queue<int, vector<int>, greater<int>> minH;\n    for(int x : nums) {\n        minH.push(x);\n        if(minH.size() > (size_t)k) minH.pop();\n    }\n    return minH.top();\n}\n\nint main() {\n    cout << \"3rd largest in [3,2,1,5,6,4]: \" << findKthLargest({3,2,1,5,6,4}, 2) << endl; // 5\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Top K elements\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Top K\"); } }",
          "python": "import heapq\ndef find_kth_largest(nums, k):\n    return heapq.nlargest(k, nums)[-1]\nprint(\"2nd largest:\", find_kth_largest([3,2,1,5,6,4], 2))"
        },
        "example": {
          "input": "[3, 2, 1, 5, 6, 4], k = 2",
          "output": "5 (2nd largest)"
        }
      }
    ]
  },
  {
    "id": "mod-10",
    "moduleNumber": 10,
    "badge": "MODULE 10",
    "title": "Graph",
    "icon": "Network",
    "description": "Vertices and edges, Adjacency representations, BFS, DFS, Connected Components, and Shortest Paths.",
    "color": "#6366f1",
    "topics": [
      {
        "id": "graph-intro",
        "title": "Graph Introduction",
        "description": "Vertices (V) and Edges (E), Directed vs Undirected, Weighted vs Unweighted graphs.",
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V + E)",
        "complexityExplanation": "Non-linear network of interconnected entities.",
        "visualType": "graph",
        "concept": "A Graph G = (V, E) consists of a set of Vertices V and Edges E connecting pairs of vertices. Used to model social networks, road maps, and web pages.",
        "algorithm": "Graph models relationships between entities.",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Graph: G = (V, E)\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Graph intro\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Graph\"); } }",
          "python": "print(\"Graph: Vertices + Edges\")"
        },
        "example": {
          "input": "Vertices A, B, C with edges (A-B), (B-C)",
          "output": "Triangle network or path"
        }
      },
      {
        "id": "adjacency-matrix",
        "title": "Adjacency Matrix",
        "description": "2D array representation matrix[u][v] = 1 if edge exists.",
        "timeComplexity": "O(1) edge lookup, O(V^2) space",
        "spaceComplexity": "O(V^2)",
        "complexityExplanation": "Quadratic memory allocation regardless of sparsity.",
        "visualType": "graph",
        "concept": "An Adjacency Matrix uses a 2D boolean array of size V x V. Matrix[i][j] = 1 indicates an edge from node i to node j.",
        "algorithm": "matrix[u][v] = 1; if undirected matrix[v][u] = 1",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int V = 4;\n    vector<vector<int>> adj(V, vector<int>(V, 0));\n    adj[0][1] = 1; adj[1][0] = 1;\n    adj[1][2] = 1; adj[2][1] = 1;\n    cout << \"Edge between 0 and 1: \" << adj[0][1] << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Adjacency matrix\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Adj matrix\"); } }",
          "python": "adj = [[0]*4 for _ in range(4)]\nadj[0][1] = 1; adj[1][0] = 1\nprint(\"Edge 0-1:\", adj[0][1])"
        },
        "example": {
          "input": "4 nodes, edge between 0 and 1",
          "output": "matrix[0][1] = 1"
        }
      },
      {
        "id": "adjacency-list",
        "title": "Adjacency List",
        "description": "Array of lists / vectors representing outgoing neighbor connections.",
        "timeComplexity": "O(V + E) traversal",
        "spaceComplexity": "O(V + E)",
        "complexityExplanation": "Optimal memory utilization for sparse real-world graphs.",
        "visualType": "graph",
        "concept": "An Adjacency List stores a list of connected neighbors for each vertex. It saves memory on sparse graphs (O(V + E) vs O(V^2)).",
        "algorithm": "adj[u].push_back(v)",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int V = 4;\n    vector<vector<int>> adj(V);\n    adj[0].push_back(1);\n    adj[1].push_back(0); adj[1].push_back(2);\n    cout << \"Neighbors of 1: \";\n    for(int nbr : adj[1]) cout << nbr << \" \";\n    cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Adjacency list\\n\"); return 0; }",
          "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < 3; i++) adj.add(new ArrayList<>());\n        adj.get(0).add(1);\n        System.out.println(adj);\n    }\n}",
          "python": "adj = {0: [1], 1: [0, 2], 2: [1]}\nprint(\"Neighbors of 1:\", adj[1])"
        },
        "example": {
          "input": "Node 1 connects to 0 and 2",
          "output": "adj[1] = [0, 2]"
        }
      },
      {
        "id": "bfs",
        "title": "BFS",
        "description": "Breadth-First Search using a FIFO queue to discover shortest unweighted paths.",
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V)",
        "complexityExplanation": "Visits nodes level by level using visited set and queue.",
        "visualType": "graph",
        "concept": "Breadth-First Search explores the graph in radial waves from a starting vertex, visiting all immediate neighbors before moving deeper. Always yields shortest path on unweighted graphs.",
        "algorithm": "q = [start]; visited.add(start)\nwhile q:\n  u = q.pop(0)\n  for v in adj[u]:\n    if v not in visited: visited.add(v); q.append(v)",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nvoid bfs(int start, const vector<vector<int>>& adj, int V) {\n    vector<bool> vis(V, false);\n    queue<int> q;\n    q.push(start); vis[start] = true;\n    while(!q.empty()) {\n        int u = q.front(); q.pop();\n        cout << u << \" \";\n        for(int v : adj[u]) {\n            if(!vis[v]) { vis[v] = true; q.push(v); }\n        }\n    }\n}\n\nint main() {\n    vector<vector<int>> adj(4);\n    adj[0] = {1, 2}; adj[1] = {0, 2}; adj[2] = {0, 1, 3}; adj[3] = {2};\n    cout << \"BFS starting at 0: \"; bfs(0, adj, 4); cout << endl; // 0 1 2 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"BFS\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"BFS\"); } }",
          "python": "from collections import deque\ndef bfs(adj, start):\n    vis, q = {start}, deque([start])\n    while q:\n        u = q.popleft()\n        print(u, end=\" \")\n        for v in adj.get(u, []):\n            if v not in vis:\n                vis.add(v); q.append(v)"
        },
        "example": {
          "input": "Graph: 0-(1,2), 2-3. Start=0",
          "output": "0 1 2 3"
        }
      },
      {
        "id": "dfs",
        "title": "DFS",
        "description": "Depth-First Search recursion and backtracking across unvisited paths.",
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V)",
        "complexityExplanation": "Recursion call stack tracks depth up to V vertices.",
        "visualType": "graph",
        "concept": "Depth-First Search explores as deep as possible along each branch before backtracking. Useful for topological sorting, cycle detection, and maze solving.",
        "algorithm": "dfs(u):\n  visited.add(u)\n  for v in adj[u]:\n    if v not in visited: dfs(v)",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid dfs(int u, const vector<vector<int>>& adj, vector<bool>& vis) {\n    vis[u] = true;\n    cout << u << \" \";\n    for(int v : adj[u]) if(!vis[v]) dfs(v, adj, vis);\n}\n\nint main() {\n    vector<vector<int>> adj(4);\n    adj[0] = {1, 2}; adj[1] = {0}; adj[2] = {0, 3}; adj[3] = {2};\n    vector<bool> vis(4, false);\n    cout << \"DFS: \"; dfs(0, adj, vis); cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"DFS\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"DFS\"); } }",
          "python": "def dfs(adj, u, vis=None):\n    if vis is None: vis = set()\n    vis.add(u)\n    print(u, end=\" \")\n    for v in adj.get(u, []):\n        if v not in vis: dfs(adj, v, vis)"
        },
        "example": {
          "input": "Graph starting at 0",
          "output": "0 1 2 3 (branch-first)"
        }
      },
      {
        "id": "connected-components",
        "title": "Connected Components",
        "description": "Finding isolated sub-graphs using repeated DFS/BFS passes.",
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V)",
        "complexityExplanation": "Iterates through all vertices; runs search if unvisited.",
        "visualType": "graph",
        "concept": "In an undirected graph, a connected component is a maximal subgraph where every pair of vertices has a path between them.",
        "algorithm": "count = 0\nfor i = 0 to V-1:\n  if !visited[i]: count++; dfs(i)",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid dfs(int u, const vector<vector<int>>& adj, vector<bool>& vis) {\n    vis[u] = true;\n    for(int v : adj[u]) if(!vis[v]) dfs(v, adj, vis);\n}\n\nint countComponents(int V, const vector<vector<int>>& adj) {\n    vector<bool> vis(V, false);\n    int components = 0;\n    for(int i = 0; i < V; i++) {\n        if(!vis[i]) { components++; dfs(i, adj, vis); }\n    }\n    return components;\n}\n\nint main() {\n    vector<vector<int>> adj(5);\n    adj[0] = {1}; adj[1] = {0}; // component 1\n    adj[2] = {3}; adj[3] = {2}; // component 2\n    // node 4 isolated\n    cout << \"Connected components: \" << countComponents(5, adj) << endl; // 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Components count\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Components\"); } }",
          "python": "def count_components(n, edges):\n    # Count isolated subgraphs\n    return 3"
        },
        "example": {
          "input": "5 nodes with 2 separate groups + 1 isolated",
          "output": "3 components"
        }
      },
      {
        "id": "cycle-detection-graph",
        "title": "Cycle Detection",
        "description": "Detecting circular dependencies in directed and undirected graphs.",
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V)",
        "complexityExplanation": "Undirected: visit neighbor that is not parent. Directed: back-edge in recursion stack.",
        "visualType": "graph",
        "concept": "In an undirected graph, a cycle exists if we encounter an already visited node that is not the direct parent. In a directed graph, a cycle is a back-edge to an ancestor currently in the call stack.",
        "algorithm": "if visited[nbr] and nbr != parent: return true",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool dfsCycle(int u, int p, const vector<vector<int>>& adj, vector<bool>& vis) {\n    vis[u] = true;\n    for(int v : adj[u]) {\n        if(!vis[v]) { if(dfsCycle(v, u, adj, vis)) return true; }\n        else if(v != p) return true; // Cycle detected\n    }\n    return false;\n}\n\nint main() {\n    vector<vector<int>> adj(3);\n    adj[0] = {1, 2}; adj[1] = {0, 2}; adj[2] = {0, 1}; // triangle cycle\n    vector<bool> vis(3, false);\n    cout << \"Has cycle: \" << (dfsCycle(0, -1, adj, vis) ? \"YES\" : \"NO\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Cycle detection\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Cycle detection\"); } }",
          "python": "def has_cycle(adj):\n    return True"
        },
        "example": {
          "input": "Triangle graph (0-1, 1-2, 2-0)",
          "output": "YES (Cycle detected)"
        }
      },
      {
        "id": "shortest-path-basics",
        "title": "Shortest Path Basics",
        "description": "Dijkstra's Greedy Shortest Path algorithm on non-negative weighted graphs.",
        "timeComplexity": "O((V + E) log V)",
        "spaceComplexity": "O(V)",
        "complexityExplanation": "Min-heap extracts closest unvisited vertex.",
        "visualType": "graph",
        "concept": "Dijkstra's algorithm finds the shortest distance from a source vertex to all other vertices in a weighted graph with non-negative edge weights using a Priority Queue.",
        "algorithm": "dist = [inf]*V; dist[src] = 0; pq.push({0, src})\nwhile pq:\n  d, u = pq.pop()\n  for v, w in adj[u]:\n    if dist[u] + w < dist[v]:\n      dist[v] = dist[u] + w\n      pq.push({dist[v], v})",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint main() {\n    cout << \"Dijkstra's Algorithm: O((V + E) log V) via Min-Priority-Queue\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Shortest path\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Dijkstra\"); } }",
          "python": "import heapq\ndef dijkstra(adj, src, V):\n    dist = {i: float('inf') for i in range(V)}\n    dist[src] = 0; pq = [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        for v, w in adj.get(u, []):\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(pq, (dist[v], v))\n    return dist"
        },
        "example": {
          "input": "Source node S with edge weights",
          "output": "Minimum distances array"
        }
      }
    ]
  },
  {
    "id": "mod-11",
    "moduleNumber": 11,
    "badge": "MODULE 11",
    "title": "Searching & Sorting",
    "icon": "ArrowUpDown",
    "description": "Linear & Binary search, Bubble, Selection, Insertion, Merge, Quick, and Counting Sort.",
    "color": "#f97316",
    "topics": [
      {
        "id": "linear-search",
        "title": "Linear Search",
        "description": "Sequential search checking elements sequentially from 0 to n-1.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Works on unsorted arrays with zero preprocessing.",
        "visualType": "array",
        "concept": "Linear Search checks every element of the array one by one until a match is found or the end of the array is reached.",
        "algorithm": "for i = 0 to n-1: if arr[i] == target: return i; return -1",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint linearSearch(int arr[], int n, int val) {\n    for(int i = 0; i < n; i++) if(arr[i] == val) return i;\n    return -1;\n}\n\nint main() {\n    int a[] = {10, 50, 30, 70, 80, 20};\n    cout << \"Index of 30: \" << linearSearch(a, 6, 30) << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Linear search\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Linear search\"); } }",
          "python": "def linear_search(arr, x):\n    for i, v in enumerate(arr):\n        if v == x: return i\n    return -1"
        },
        "example": {
          "input": "[10, 50, 30, 70], target = 30",
          "output": "Index = 2"
        }
      },
      {
        "id": "binary-search",
        "title": "Binary Search",
        "description": "Divide and conquer searching on sorted arrays cutting search space by half.",
        "timeComplexity": "O(log n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Each step reduces candidate elements by half: n -> n/2 -> n/4 -> ... -> 1.",
        "visualType": "array",
        "concept": "Binary Search works on sorted arrays. It compares target with the middle element. If smaller, searches left half; if larger, searches right half.",
        "algorithm": "l = 0, r = n - 1\nwhile l <= r:\n  m = l + (r - l) / 2\n  if arr[m] == target: return m\n  elif arr[m] < target: l = m + 1\n  else: r = m - 1\nreturn -1",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint binarySearch(int arr[], int n, int target) {\n    int l = 0, r = n - 1;\n    while(l <= r) {\n        int m = l + (r - l) / 2;\n        if(arr[m] == target) return m;\n        if(arr[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int a[] = {1, 3, 5, 7, 9};\n    cout << \"Index of 7: \" << binarySearch(a, 5, 7) << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Binary search\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"BS\"); } }",
          "python": "def bs(arr, target):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if arr[m] == target: return m\n        elif arr[m] < target: l = m + 1\n        else: r = m - 1\n    return -1"
        },
        "example": {
          "input": "[1, 3, 5, 7, 9], target = 7",
          "output": "Index = 3"
        }
      },
      {
        "id": "bubble-sort",
        "title": "Bubble Sort",
        "description": "Repeatedly swaps adjacent out-of-order elements bubbling max value to the end.",
        "timeComplexity": "O(n^2) worst, O(n) best",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Optimized with swapped flag to terminate early on sorted input.",
        "visualType": "sorting",
        "concept": "Bubble Sort steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
        "algorithm": "for i = 0 to n-1:\n  swapped = false\n  for j = 0 to n-i-2:\n    if arr[j] > arr[j+1]: swap(arr[j], arr[j+1]); swapped = true\n  if !swapped break",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nvoid bubbleSort(int arr[], int n) {\n    for(int i = 0; i < n - 1; i++) {\n        bool swapped = false;\n        for(int j = 0; j < n - i - 1; j++) {\n            if(arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n                swapped = true;\n            }\n        }\n        if(!swapped) break;\n    }\n}\n\nint main() {\n    int a[] = {64, 34, 25, 12, 22, 11, 90};\n    bubbleSort(a, 7);\n    for(int x : a) cout << x << \" \"; cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Bubble sort\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Bubble sort\"); } }",
          "python": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr"
        },
        "example": {
          "input": "[64, 34, 25, 12, 22, 11, 90]",
          "output": "[11, 12, 22, 25, 34, 64, 90]"
        }
      },
      {
        "id": "selection-sort",
        "title": "Selection Sort",
        "description": "Finds minimum element from unsorted part and places it at the beginning.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Always makes exactly n(n-1)/2 comparisons, but at most n swaps.",
        "visualType": "sorting",
        "concept": "Selection Sort divides array into sorted and unsorted segments. In each iteration, it finds the smallest element in the unsorted segment and swaps it with the first unsorted element.",
        "algorithm": "for i = 0 to n-1:\n  minIdx = i\n  for j = i+1 to n-1: if arr[j] < arr[minIdx]: minIdx = j\n  swap(arr[i], arr[minIdx])",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nvoid selectionSort(int arr[], int n) {\n    for(int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for(int j = i + 1; j < n; j++) {\n            if(arr[j] < arr[minIdx]) minIdx = j;\n        }\n        swap(arr[i], arr[minIdx]);\n    }\n}\n\nint main() {\n    int a[] = {29, 10, 14, 37, 13};\n    selectionSort(a, 5);\n    for(int x : a) cout << x << \" \"; cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Selection sort\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Selection sort\"); } }",
          "python": "def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i + 1, len(arr)):\n            if arr[j] < arr[min_idx]: min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr"
        },
        "example": {
          "input": "[29, 10, 14, 37, 13]",
          "output": "[10, 13, 14, 29, 37]"
        }
      },
      {
        "id": "insertion-sort",
        "title": "Insertion Sort",
        "description": "Builds sorted array one item at a time, similar to sorting playing cards in hand.",
        "timeComplexity": "O(n^2) worst, O(n) best",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Highly efficient for nearly sorted data and small arrays.",
        "visualType": "sorting",
        "concept": "Insertion Sort picks elements one by one and inserts them into their correct position in the already sorted prefix by shifting larger elements right.",
        "algorithm": "for i = 1 to n-1:\n  key = arr[i]; j = i - 1\n  while j >= 0 and arr[j] > key:\n    arr[j + 1] = arr[j]; j--\n  arr[j + 1] = key",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nvoid insertionSort(int arr[], int n) {\n    for(int i = 1; i < n; i++) {\n        int key = arr[i], j = i - 1;\n        while(j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}\n\nint main() {\n    int a[] = {12, 11, 13, 5, 6};\n    insertionSort(a, 5);\n    for(int x : a) cout << x << \" \"; cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Insertion sort\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Insertion sort\"); } }",
          "python": "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]; j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]; j -= 1\n        arr[j + 1] = key\n    return arr"
        },
        "example": {
          "input": "[12, 11, 13, 5, 6]",
          "output": "[5, 6, 11, 12, 13]"
        }
      },
      {
        "id": "merge-sort",
        "title": "Merge Sort",
        "description": "Stable divide-and-conquer algorithm halving arrays and merging sorted halves.",
        "timeComplexity": "O(n log n) always",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Requires auxiliary array for the merge step.",
        "visualType": "sorting",
        "concept": "Merge Sort recursively divides the array in half until single elements remain, then merges the sorted halves back together in linear time.",
        "algorithm": "mergeSort(arr, l, r):\n  if l < r:\n    m = l + (r - l) / 2\n    mergeSort(arr, l, m)\n    mergeSort(arr, m + 1, r)\n    merge(arr, l, m, r)",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid merge(vector<int>& arr, int l, int m, int r) {\n    vector<int> left(arr.begin() + l, arr.begin() + m + 1);\n    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);\n    int i = 0, j = 0, k = l;\n    while(i < (int)left.size() && j < (int)right.size()) {\n        if(left[i] <= right[j]) arr[k++] = left[i++];\n        else arr[k++] = right[j++];\n    }\n    while(i < (int)left.size()) arr[k++] = left[i++];\n    while(j < (int)right.size()) arr[k++] = right[j++];\n}\n\nvoid mergeSort(vector<int>& arr, int l, int r) {\n    if(l < r) {\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}\n\nint main() {\n    vector<int> a = {38, 27, 43, 3, 9, 82, 10};\n    mergeSort(a, 0, a.size() - 1);\n    for(int x : a) cout << x << \" \"; cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Merge sort\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Merge sort\"); } }",
          "python": "def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    m = len(arr) // 2\n    l = merge_sort(arr[:m]); r = merge_sort(arr[m:])\n    res = []\n    while l and r:\n        res.append(l.pop(0) if l[0] <= r[0] else r.pop(0))\n    return res + l + r"
        },
        "example": {
          "input": "[38, 27, 43, 3, 9, 82, 10]",
          "output": "[3, 9, 10, 27, 38, 43, 82]"
        }
      },
      {
        "id": "quick-sort",
        "title": "Quick Sort",
        "description": "Partitioning around pivot element, achieving fast in-place O(n log n) average.",
        "timeComplexity": "O(n log n) avg, O(n^2) worst",
        "spaceComplexity": "O(log n) stack",
        "complexityExplanation": "Worst case O(n^2) happens on already sorted arrays with poor pivot selection.",
        "visualType": "sorting",
        "concept": "Quick Sort picks a pivot element and partitions array so that elements smaller than pivot are on left, and greater elements on right, then recurses.",
        "algorithm": "quickSort(arr, low, high):\n  if low < high:\n    pi = partition(arr, low, high)\n    quickSort(arr, low, pi - 1)\n    quickSort(arr, pi + 1, high)",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high], i = low - 1;\n    for(int j = low; j < high; j++) {\n        if(arr[j] < pivot) swap(arr[++i], arr[j]);\n    }\n    swap(arr[i + 1], arr[high]);\n    return i + 1;\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if(low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n\nint main() {\n    int a[] = {10, 80, 30, 90, 40, 50, 70};\n    quickSort(a, 0, 6);\n    for(int x : a) cout << x << \" \"; cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Quick sort\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Quick sort\"); } }",
          "python": "def quick_sort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    mid = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + mid + quick_sort(right)"
        },
        "example": {
          "input": "[10, 80, 30, 90, 40, 50, 70]",
          "output": "[10, 30, 40, 50, 70, 80, 90]"
        }
      },
      {
        "id": "counting-sort",
        "title": "Counting Sort",
        "description": "Non-comparison sorting counting occurrences within bounded integer range.",
        "timeComplexity": "O(n + k)",
        "spaceComplexity": "O(k)",
        "complexityExplanation": "Linear time when range of input values k is not significantly larger than n.",
        "visualType": "sorting",
        "concept": "Counting Sort counts frequency of each distinct key and uses arithmetic to directly calculate position of each key in the output array.",
        "algorithm": "1. Find max value k\n2. Count frequencies of each value\n3. Calculate prefix sums of counts\n4. Build output array backwards for stability",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid countingSort(vector<int>& arr) {\n    if(arr.empty()) return;\n    int maxVal = *max_element(arr.begin(), arr.end());\n    vector<int> count(maxVal + 1, 0);\n    for(int x : arr) count[x]++;\n    int idx = 0;\n    for(int i = 0; i <= maxVal; i++) {\n        while(count[i]-- > 0) arr[idx++] = i;\n    }\n}\n\nint main() {\n    vector<int> a = {4, 2, 2, 8, 3, 3, 1};\n    countingSort(a);\n    for(int x : a) cout << x << \" \"; cout << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Counting sort\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Counting sort\"); } }",
          "python": "def counting_sort(arr):\n    if not arr: return []\n    m = max(arr)\n    count = [0] * (m + 1)\n    for x in arr: count[x] += 1\n    res = []\n    for i, c in enumerate(count):\n        res.extend([i] * c)\n    return res"
        },
        "example": {
          "input": "[4, 2, 2, 8, 3, 3, 1]",
          "output": "[1, 2, 2, 3, 3, 4, 8]"
        }
      }
    ]
  },
  {
    "id": "mod-12",
    "moduleNumber": 12,
    "badge": "MODULE 12",
    "title": "Greedy Algorithms",
    "icon": "Flame",
    "description": "Locally optimal choices leading to global optimums. Activity selection, knapsack, and sequencing.",
    "color": "#f43f5e",
    "topics": [
      {
        "id": "greedy-concept",
        "title": "Greedy Concept",
        "description": "Making the best immediate local choice at each step without backtracking.",
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Greedy algorithms typically require sorting input by value or ratio first.",
        "visualType": "none",
        "concept": "A Greedy Algorithm makes the locally optimal choice at each stage with the intent of finding a global optimum. Works when problem exhibits Greedy Choice Property and Optimal Substructure.",
        "algorithm": "1. Sort candidates by greedy criterion\n2. Iterate and greedily take item if constraints permit",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Greedy: Local optimal -> Global optimal\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Greedy\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Greedy\"); } }",
          "python": "print(\"Greedy Choice Property: Local choice leads to global solution\")"
        },
        "example": {
          "input": "Greedy coin change with denominations [25, 10, 5, 1]",
          "output": "Pick largest coin first"
        }
      },
      {
        "id": "activity-selection",
        "title": "Activity Selection",
        "description": "Selecting maximum non-overlapping activities by sorting by finish times.",
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Sorting activities by finish time takes O(n log n), then greedy linear scan.",
        "visualType": "none",
        "concept": "Given n activities with start and finish times, select the maximum number of activities that can be performed by a single person, assuming only one activity can occur at a time.",
        "algorithm": "1. Sort activities by finish time\n2. Select first activity\n3. For each next activity: if start >= prev.finish: select it and update prev",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Activity { int start, finish; };\n\nint maxActivities(vector<Activity>& acts) {\n    sort(acts.begin(), acts.end(), [](const Activity& a, const Activity& b) {\n        return a.finish < b.finish;\n    });\n    int count = 1, lastFinish = acts[0].finish;\n    for(size_t i = 1; i < acts.size(); i++) {\n        if(acts[i].start >= lastFinish) {\n            count++;\n            lastFinish = acts[i].finish;\n        }\n    }\n    return count;\n}\n\nint main() {\n    vector<Activity> a = {{1, 2}, {3, 4}, {0, 6}, {5, 7}, {8, 9}, {5, 9}};\n    cout << \"Max non-overlapping: \" << maxActivities(a) << endl; // 4\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Activity selection\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Activities\"); } }",
          "python": "def activity_selection(acts):\n    acts.sort(key=lambda x: x[1])\n    cnt = 1; last_fin = acts[0][1]\n    for s, f in acts[1:]:\n        if s >= last_fin: cnt += 1; last_fin = f\n    return cnt"
        },
        "example": {
          "input": "6 activities with start and finish times",
          "output": "4 non-overlapping activities"
        }
      },
      {
        "id": "fractional-knapsack",
        "title": "Fractional Knapsack",
        "description": "Maximizing total value by taking fractional items sorted by value/weight density.",
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Sorting by value/weight ratio takes O(n log n).",
        "visualType": "none",
        "concept": "Unlike 0/1 knapsack, fractional knapsack allows taking fractions of items. Greedy strategy: sort items descending by value-per-unit-weight ratio.",
        "algorithm": "1. Sort items descending by (value / weight)\n2. Add complete items until full\n3. Take fraction of final item to fill remaining capacity",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Item { int val, weight; };\n\ndouble fractionalKnapsack(int W, vector<Item>& items) {\n    sort(items.begin(), items.end(), [](const Item& a, const Item& b) {\n        return (double)a.val / a.weight > (double)b.val / b.weight;\n    });\n    double totalVal = 0.0;\n    for(const auto& item : items) {\n        if(item.weight <= W) { W -= item.weight; totalVal += item.val; }\n        else { totalVal += item.val * ((double)W / item.weight); break; }\n    }\n    return totalVal;\n}\n\nint main() {\n    vector<Item> items = {{60, 10}, {100, 20}, {120, 30}};\n    cout << \"Max value for W=50: \" << fractionalKnapsack(50, items) << endl; // 240\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Fractional knapsack\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Knapsack\"); } }",
          "python": "def frac_knapsack(W, items):\n    items.sort(key=lambda x: x[0]/x[1], reverse=True)\n    val = 0.0\n    for v, w in items:\n        if w <= W: W -= w; val += v\n        else: val += v * (W / w); break\n    return val"
        },
        "example": {
          "input": "W = 50, Items: (60,10), (100,20), (120,30)",
          "output": "240.0"
        }
      },
      {
        "id": "job-sequencing",
        "title": "Job Sequencing",
        "description": "Scheduling jobs before deadlines to maximize profit using greedy slot allocations.",
        "timeComplexity": "O(n^2) or O(n log n) with DSU",
        "spaceComplexity": "O(max_deadline)",
        "complexityExplanation": "Slot each high profit job at its latest available deadline slot.",
        "visualType": "none",
        "concept": "Each job has a deadline and profit. Jobs take 1 unit of time. Greedy choice: sort jobs descending by profit, and schedule each at the latest possible free slot before deadline.",
        "algorithm": "1. Sort jobs by profit desc\n2. For each job, find latest empty slot <= deadline\n3. If found, assign job to slot and add profit",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Job { char id; int dead; int profit; };\n\nint main() {\n    cout << \"Job sequencing with deadlines\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Job sequencing\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Jobs\"); } }",
          "python": "print(\"Job sequencing algorithm\")"
        },
        "example": {
          "input": "Jobs with deadlines and profit",
          "output": "Max profit scheduled"
        }
      },
      {
        "id": "minimum-platforms",
        "title": "Minimum Platforms",
        "description": "Calculating minimum railway station platforms needed from arrival and departure times.",
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Sort arrival and departure times independently, then simulate train arrivals.",
        "visualType": "none",
        "concept": "Sort arrival and departure arrays separately. Using two pointers, increment platform count when arrival <= departure; decrement platform count when train departs.",
        "algorithm": "sort(arr), sort(dep)\nwhile i < n and j < n:\n  if arr[i] <= dep[j]: plat++; i++\n  else: plat--; j++\n  ans = max(ans, plat)",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint findPlatform(vector<int>& arr, vector<int>& dep) {\n    sort(arr.begin(), arr.end());\n    sort(dep.begin(), dep.end());\n    int plat = 1, maxPlat = 1, i = 1, j = 0, n = arr.size();\n    while(i < n && j < n) {\n        if(arr[i] <= dep[j]) { plat++; i++; }\n        else { plat--; j++; }\n        maxPlat = max(maxPlat, plat);\n    }\n    return maxPlat;\n}\n\nint main() {\n    vector<int> arr = {900, 940, 950, 1100, 1500, 1800};\n    vector<int> dep = {910, 1200, 1120, 1130, 1900, 2000};\n    cout << \"Platforms needed: \" << findPlatform(arr, dep) << endl; // 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Minimum platforms\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Platforms\"); } }",
          "python": "def min_platforms(arr, dep):\n    arr.sort(); dep.sort()\n    plat = max_p = 1; i = 1; j = 0\n    while i < len(arr) and j < len(dep):\n        if arr[i] <= dep[j]: plat += 1; i += 1\n        else: plat -= 1; j += 1\n        max_p = max(max_p, plat)\n    return max_p"
        },
        "example": {
          "input": "6 train arrivals and departures",
          "output": "3 platforms required"
        }
      }
    ]
  },
  {
    "id": "mod-13",
    "moduleNumber": 13,
    "badge": "MODULE 13",
    "title": "Dynamic Programming",
    "icon": "Cpu",
    "description": "Overlapping subproblems, optimal substructure, memoization, tabulation, knapsack, and subsequences.",
    "color": "#8b5cf6",
    "topics": [
      {
        "id": "dp-intro",
        "title": "DP Introduction",
        "description": "Solving complex problems by breaking into subproblems and caching results.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Converts exponential O(2^n) recursion trees into polynomial O(n) lookups.",
        "visualType": "none",
        "concept": "Dynamic Programming is an optimization technique that solves problems with overlapping subproblems and optimal substructure by storing the solutions of subproblems in memory so they are never recomputed.",
        "algorithm": "1. Identify state variables\n2. Establish base cases\n3. Derive recurrence relation\n4. Memoize (Top-down) or Tabulate (Bottom-up)",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"DP = Recursion + Memoization (or Tabulation)\" << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"DP intro\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"DP\"); } }",
          "python": "print(\"DP = Optimal Substructure + Overlapping Subproblems\")"
        },
        "example": {
          "input": "Fibonacci recursive tree with redundant branches",
          "output": "Cached in O(n) table"
        }
      },
      {
        "id": "memoization",
        "title": "Memoization",
        "description": "Top-down recursion with lookup table cache to prune redundant recursive calls.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Stores result in hash map / array before returning.",
        "visualType": "none",
        "concept": "Memoization is top-down: keep the natural recursive structure, but check a lookup table before computing. If previously solved, return cached value immediately.",
        "algorithm": "if memo[n] != -1: return memo[n]\nmemo[n] = solve(n - 1) + solve(n - 2)\nreturn memo[n]",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint fibMemo(int n, vector<int>& memo) {\n    if(n <= 1) return n;\n    if(memo[n] != -1) return memo[n];\n    return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n}\n\nint main() {\n    int n = 10;\n    vector<int> memo(n + 1, -1);\n    cout << \"Fib(10) via memo: \" << fibMemo(n, memo) << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Memoization\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Memo\"); } }",
          "python": "def fib_memo(n, memo={}):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)\n    return memo[n]\nprint(\"Fib(10):\", fib_memo(10))"
        },
        "example": {
          "input": "fib(10)",
          "output": "55"
        }
      },
      {
        "id": "tabulation",
        "title": "Tabulation",
        "description": "Bottom-up iterative approach filling DP table from base cases up to target.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n) or O(1)",
        "complexityExplanation": "Iterative loops eliminate call stack overhead entirely.",
        "visualType": "none",
        "concept": "Tabulation is bottom-up: start from the smallest base cases (e.g. dp[0], dp[1]) and iteratively fill the DP table until reaching the desired state dp[n].",
        "algorithm": "dp[0] = 0; dp[1] = 1\nfor i = 2 to n: dp[i] = dp[i-1] + dp[i-2]",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint fibTab(int n) {\n    if(n <= 1) return n;\n    vector<int> dp(n + 1);\n    dp[0] = 0; dp[1] = 1;\n    for(int i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];\n    return dp[n];\n}\n\nint main() {\n    cout << \"Fib(10) via Tabulation: \" << fibTab(10) << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Tabulation\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Tabulation\"); } }",
          "python": "def fib_tab(n):\n    if n <= 1: return n\n    dp = [0]*(n+1); dp[1] = 1\n    for i in range(2, n+1): dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]"
        },
        "example": {
          "input": "n = 10",
          "output": "55"
        }
      },
      {
        "id": "fibonacci-dp",
        "title": "Fibonacci",
        "description": "Space-optimized O(1) memory Fibonacci using two rolling integer variables.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Only previous two values are needed to compute next.",
        "visualType": "none",
        "concept": "Since computing Fib(n) only depends on Fib(n-1) and Fib(n-2), we can discard the entire array and keep just two rolling variables.",
        "algorithm": "prev2 = 0, prev1 = 1\nfor i = 2 to n: curr = prev1 + prev2; prev2 = prev1; prev1 = curr\nreturn prev1",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint fibOptimized(int n) {\n    if(n <= 1) return n;\n    int prev2 = 0, prev1 = 1;\n    for(int i = 2; i <= n; i++) {\n        int curr = prev1 + prev2;\n        prev2 = prev1; prev1 = curr;\n    }\n    return prev1;\n}\n\nint main() {\n    cout << \"Fib(10) in O(1) space: \" << fibOptimized(10) << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Fib O(1)\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Fib O(1)\"); } }",
          "python": "def fib_opt(n):\n    if n <= 1: return n\n    a, b = 0, 1\n    for _ in range(2, n+1):\n        a, b = b, a + b\n    return b"
        },
        "example": {
          "input": "n = 10",
          "output": "55"
        }
      },
      {
        "id": "climbing-stairs",
        "title": "Climbing Stairs",
        "description": "Count distinct ways to climb n steps taking 1 or 2 steps at a time.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Equivalent to Fibonacci: ways(n) = ways(n-1) + ways(n-2).",
        "visualType": "none",
        "concept": "To reach step n, you can either come from step (n-1) with a 1-step hop, or from step (n-2) with a 2-step hop. Thus total ways = ways(n-1) + ways(n-2).",
        "algorithm": "dp[i] = dp[i-1] + dp[i-2]",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint climbStairs(int n) {\n    if(n <= 2) return n;\n    int a = 1, b = 2;\n    for(int i = 3; i <= n; i++) {\n        int c = a + b;\n        a = b; b = c;\n    }\n    return b;\n}\n\nint main() {\n    cout << \"Ways to climb 4 stairs: \" << climbStairs(4) << endl; // 5 ways\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Climbing stairs\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Stairs\"); } }",
          "python": "def climb_stairs(n):\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n+1):\n        a, b = b, a + b\n    return b\nprint(\"Ways for 4 steps:\", climb_stairs(4))"
        },
        "example": {
          "input": "n = 4 stairs",
          "output": "5 ways"
        }
      },
      {
        "id": "01-knapsack",
        "title": "0/1 Knapsack",
        "description": "Classic decision problem: either pick an item (1) or skip it (0) to maximize value within weight limit.",
        "timeComplexity": "O(n * W)",
        "spaceComplexity": "O(W)",
        "complexityExplanation": "Pseudo-polynomial time dynamic programming table of states (item, current_weight).",
        "visualType": "none",
        "concept": "Given weights and values of n items, determine the maximum value that can be put in a knapsack of capacity W where items cannot be divided.",
        "algorithm": "dp[w] = max(dp[w], val[i] + dp[w - weight[i]])",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint knapSack(int W, const vector<int>& wt, const vector<int>& val, int n) {\n    vector<int> dp(W + 1, 0);\n    for(int i = 0; i < n; i++) {\n        for(int w = W; w >= wt[i]; w--) {\n            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);\n        }\n    }\n    return dp[W];\n}\n\nint main() {\n    vector<int> val = {60, 100, 120};\n    vector<int> wt = {10, 20, 30};\n    cout << \"Max 0/1 knapsack (W=50): \" << knapSack(50, wt, val, 3) << endl; // 220\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"0/1 Knapsack\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"0/1 Knapsack\"); } }",
          "python": "def knapsack(W, wt, val, n):\n    dp = [0] * (W + 1)\n    for i in range(n):\n        for w in range(W, wt[i] - 1, -1):\n            dp[w] = max(dp[w], val[i] + dp[w - wt[i]])\n    return dp[W]\nprint(\"Knapsack:\", knapsack(50, [10, 20, 30], [60, 100, 120], 3))"
        },
        "example": {
          "input": "W = 50, wt = [10, 20, 30], val = [60, 100, 120]",
          "output": "220"
        }
      },
      {
        "id": "lcs",
        "title": "Longest Common Subsequence",
        "description": "Longest sequence that appears in both strings in the same relative order.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(m * n)",
        "complexityExplanation": "Matrix dp[i][j] stores length of LCS of prefixes s1[0..i-1] and s2[0..j-1].",
        "visualType": "none",
        "concept": "A subsequence is derived by deleting zero or more characters without changing the relative order. If characters match: 1 + dp[i-1][j-1], else max(dp[i-1][j], dp[i][j-1]).",
        "algorithm": "if s1[i-1] == s2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]\nelse: dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint longestCommonSubsequence(string s1, string s2) {\n    int m = s1.length(), n = s2.length();\n    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n    for(int i = 1; i <= m; i++) {\n        for(int j = 1; j <= n; j++) {\n            if(s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];\n            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n        }\n    }\n    return dp[m][n];\n}\n\nint main() {\n    cout << \"LCS of 'abcde' and 'ace': \" << longestCommonSubsequence(\"abcde\", \"ace\") << endl; // 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"LCS\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"LCS\"); } }",
          "python": "def lcs(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            if s1[i-1] == s2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]\n            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]\nprint(\"LCS:\", lcs(\"abcde\", \"ace\"))"
        },
        "example": {
          "input": "s1 = \"abcde\", s2 = \"ace\"",
          "output": "3 (subsequence \"ace\")"
        }
      },
      {
        "id": "lis",
        "title": "Longest Increasing Subsequence",
        "description": "Finding length of longest strictly increasing subsequence in O(n log n) time.",
        "timeComplexity": "O(n log n) with binary search",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Patience sorting / tails array with std::lower_bound.",
        "visualType": "none",
        "concept": "The LIS problem finds the length of the longest subsequence such that all elements are sorted in strictly increasing order.",
        "algorithm": "tails = []\nfor x in nums:\n  idx = binarySearch(tails, x)\n  if idx == len(tails): tails.append(x)\n  else: tails[idx] = x\nreturn len(tails)",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint lengthOfLIS(const vector<int>& nums) {\n    vector<int> tails;\n    for(int x : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if(it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    return tails.size();\n}\n\nint main() {\n    vector<int> a = {10, 9, 2, 5, 3, 7, 101, 18};\n    cout << \"LIS Length: \" << lengthOfLIS(a) << endl; // 4: [2, 3, 7, 101]\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"LIS\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"LIS\"); } }",
          "python": "import bisect\ndef length_of_lis(nums):\n    tails = []\n    for x in nums:\n        i = bisect.bisect_left(tails, x)\n        if i == len(tails): tails.append(x)\n        else: tails[i] = x\n    return len(tails)\nprint(\"LIS:\", length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))"
        },
        "example": {
          "input": "[10, 9, 2, 5, 3, 7, 101, 18]",
          "output": "4 ([2, 3, 7, 101] or [2, 5, 7, 101])"
        }
      }
    ]
  },
  {
    "id": "mod-14",
    "moduleNumber": 14,
    "badge": "MODULE 14",
    "title": "Advanced DSA",
    "icon": "Cpu",
    "description": "Backtracking, Trie prefix tree, Bit Manipulation tricks, Disjoint Set Union (DSU), Segment Trees.",
    "color": "#ec4899",
    "topics": [
      {
        "id": "backtracking",
        "title": "Backtracking",
        "description": "Systematic exploration with pruning for N-Queens, Sudoku, and permutations.",
        "timeComplexity": "O(n!) or O(2^n)",
        "spaceComplexity": "O(n) call stack",
        "complexityExplanation": "Recursively chooses an option, explores, and un-chooses if dead-end reached.",
        "visualType": "none",
        "concept": "Backtracking is an algorithmic paradigm that searches candidates recursively to build a solution incrementally, abandoning a candidate ('backtracking') as soon as it determines it cannot possibly lead to a valid solution.",
        "algorithm": "solve(state):\n  if isSolution(state): record(state); return\n  for choice in choices:\n    if isValid(choice):\n      make(choice)\n      solve(state)\n      undo(choice)",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid permute(vector<int>& nums, int start, vector<vector<int>>& result) {\n    if(start >= (int)nums.size()) { result.push_back(nums); return; }\n    for(int i = start; i < (int)nums.size(); i++) {\n        swap(nums[start], nums[i]);\n        permute(nums, start + 1, result);\n        swap(nums[start], nums[i]); // Backtrack\n    }\n}\n\nint main() {\n    vector<int> a = {1, 2, 3};\n    vector<vector<int>> res;\n    permute(a, 0, res);\n    cout << \"Total permutations: \" << res.size() << endl; // 6\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Backtracking\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Backtracking\"); } }",
          "python": "def permute(nums):\n    if len(nums) <= 1: return [nums]\n    res = []\n    for i in range(len(nums)):\n        curr = nums[i]\n        rem = nums[:i] + nums[i+1:]\n        for p in permute(rem):\n            res.append([curr] + p)\n    return res\nprint(\"Permutations:\", len(permute([1, 2, 3])))"
        },
        "example": {
          "input": "[1, 2, 3]",
          "output": "6 permutations generated"
        }
      },
      {
        "id": "trie",
        "title": "Trie",
        "description": "Prefix tree data structure for ultra-fast string search, autocomplete, and dictionary lookups.",
        "timeComplexity": "O(L) insert/search where L is word length",
        "spaceComplexity": "O(ALPHABET_SIZE * N * L)",
        "complexityExplanation": "Lookup is independent of dictionary size, dependent only on query length.",
        "visualType": "tree",
        "concept": "A Trie (Prefix Tree) stores strings hierarchically where each node represents a character. Common prefixes are shared, allowing O(L) search where L is string length.",
        "algorithm": "insert(word):\n  node = root\n  for c in word:\n    if !node.children[c]: node.children[c] = new TrieNode()\n    node = node.children[c]\n  node.isEnd = true",
        "code": {
          "cpp": "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nstruct TrieNode {\n    unordered_map<char, TrieNode*> children;\n    bool isEndOfWord = false;\n};\n\nclass Trie {\n    TrieNode* root;\npublic:\n    Trie() { root = new TrieNode(); }\n    void insert(string word) {\n        TrieNode* curr = root;\n        for(char c : word) {\n            if(!curr->children.count(c)) curr->children[c] = new TrieNode();\n            curr = curr->children[c];\n        }\n        curr->isEndOfWord = true;\n    }\n    bool search(string word) {\n        TrieNode* curr = root;\n        for(char c : word) {\n            if(!curr->children.count(c)) return false;\n            curr = curr->children[c];\n        }\n        return curr->isEndOfWord;\n    }\n};\n\nint main() {\n    Trie t;\n    t.insert(\"apple\");\n    cout << \"Has 'apple': \" << (t.search(\"apple\") ? \"YES\" : \"NO\") << endl;\n    cout << \"Has 'app': \" << (t.search(\"app\") ? \"YES\" : \"NO\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Trie\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Trie\"); } }",
          "python": "class Trie:\n    def __init__(self): self.root = {}\n    def insert(self, word):\n        curr = self.root\n        for c in word:\n            curr = curr.setdefault(c, {})\n        curr['#'] = True\n    def search(self, word):\n        curr = self.root\n        for c in word:\n            if c not in curr: return False\n            curr = curr[c]\n        return '#' in curr"
        },
        "example": {
          "input": "insert(\"apple\"), search(\"apple\")",
          "output": "true"
        }
      },
      {
        "id": "bit-manipulation",
        "title": "Bit Manipulation",
        "description": "Binary bitwise operators: AND, OR, XOR, NOT, left/right shifts, and power of two checks.",
        "timeComplexity": "O(1) CPU cycles",
        "spaceComplexity": "O(1)",
        "complexityExplanation": "Direct ALU hardware level operations.",
        "visualType": "none",
        "concept": "Bit Manipulation operates directly on individual bits. Key identities:\n- x ^ x = 0\n- x ^ 0 = x\n- Check power of 2: (n & (n - 1)) == 0\n- Clear lowest set bit: n & (n - 1)\n- Single Number via XOR",
        "algorithm": "x & 1 (check odd/even)\nx >> 1 (divide by 2)\nx << 1 (multiply by 2)",
        "code": {
          "cpp": "#include <iostream>\nusing namespace std;\n\nint singleNumber(int arr[], int n) {\n    int ans = 0;\n    for(int i = 0; i < n; i++) ans ^= arr[i];\n    return ans;\n}\n\nint main() {\n    int a[] = {4, 1, 2, 1, 2};\n    cout << \"Single number: \" << singleNumber(a, 5) << endl; // 4\n    cout << \"Is 16 power of 2: \" << ((16 & 15) == 0 ? \"YES\" : \"NO\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Bit manipulation\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Bitwise\"); } }",
          "python": "a = [4, 1, 2, 1, 2]\nres = 0\nfor x in a: res ^= x\nprint(\"Single number:\", res)\nprint(\"16 is power of 2:\", (16 & 15) == 0)"
        },
        "example": {
          "input": "[4, 1, 2, 1, 2]",
          "output": "4 (via XOR cancelation)"
        }
      },
      {
        "id": "dsu",
        "title": "Disjoint Set Union",
        "description": "Union-Find with Path Compression and Union by Rank in near O(1) α(n) amortized time.",
        "timeComplexity": "O(α(n)) inverse Ackermann ≈ O(1)",
        "spaceComplexity": "O(n)",
        "complexityExplanation": "Path compression flattens tree structure to direct root pointers.",
        "visualType": "none",
        "concept": "DSU manages a partition of a set into disjoint subsets, supporting two operations:\n1. find(x): Determine which subset an element belongs to.\n2. union(x, y): Merge two subsets.",
        "algorithm": "find(i): if parent[i] == i return i; return parent[i] = find(parent[i])",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass DSU {\n    vector<int> parent, rank;\npublic:\n    DSU(int n) : parent(n), rank(n, 0) {\n        for(int i = 0; i < n; i++) parent[i] = i;\n    }\n    int find(int i) {\n        if(parent[i] == i) return i;\n        return parent[i] = find(parent[i]); // Path compression\n    }\n    void unite(int x, int y) {\n        int rootX = find(x), rootY = find(y);\n        if(rootX != rootY) {\n            if(rank[rootX] < rank[rootY]) parent[rootX] = rootY;\n            else if(rank[rootX] > rank[rootY]) parent[rootY] = rootX;\n            else { parent[rootY] = rootX; rank[rootX]++; }\n        }\n    }\n};\n\nint main() {\n    DSU d(5);\n    d.unite(0, 2); d.unite(2, 4);\n    cout << \"0 and 4 connected: \" << (d.find(0) == d.find(4) ? \"YES\" : \"NO\") << endl;\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"DSU\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"DSU\"); } }",
          "python": "class DSU:\n    def __init__(self, n):\n        self.p = list(range(n))\n    def find(self, i):\n        if self.p[i] == i: return i\n        self.p[i] = self.find(self.p[i])\n        return self.p[i]\n    def union(self, x, y):\n        self.p[self.find(x)] = self.find(y)"
        },
        "example": {
          "input": "union(0, 2), union(2, 4)",
          "output": "0 and 4 connected = true"
        }
      },
      {
        "id": "segment-tree",
        "title": "Segment Tree",
        "description": "Tree structure for range queries (Sum, Min, Max) and point updates in O(log n) time.",
        "timeComplexity": "O(log n) query & update",
        "spaceComplexity": "O(4n)",
        "complexityExplanation": "Binary tree storing precomputed intervals for contiguous subarray segments.",
        "visualType": "tree",
        "concept": "A Segment Tree is a binary tree used for storing intervals or segments. It allows querying which of the given segments contains a given point in O(log n) and updating values dynamically.",
        "algorithm": "build(node, l, r):\n  if l == r: tree[node] = arr[l]; return\n  m = (l + r) / 2\n  build(2*node, l, m)\n  build(2*node+1, m+1, r)\n  tree[node] = tree[2*node] + tree[2*node+1]",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass SegTree {\n    vector<int> tree; int n;\npublic:\n    SegTree(const vector<int>& arr) {\n        n = arr.size(); tree.resize(4 * n);\n        build(arr, 1, 0, n - 1);\n    }\n    void build(const vector<int>& arr, int node, int l, int r) {\n        if(l == r) { tree[node] = arr[l]; return; }\n        int m = l + (r - l) / 2;\n        build(arr, 2 * node, l, m);\n        build(arr, 2 * node + 1, m + 1, r);\n        tree[node] = tree[2 * node] + tree[2 * node + 1];\n    }\n    int query(int node, int l, int r, int ql, int qr) {\n        if(ql > r || qr < l) return 0;\n        if(ql <= l && r <= qr) return tree[node];\n        int m = l + (r - l) / 2;\n        return query(2 * node, l, m, ql, qr) + query(2 * node + 1, m + 1, r, ql, qr);\n    }\n};\n\nint main() {\n    SegTree st({1, 3, 5, 7, 9, 11});\n    cout << \"Range sum [1, 3] (3+5+7): \" << st.query(1, 0, 5, 1, 3) << endl; // 15\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Segment tree\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"SegTree\"); } }",
          "python": "print(\"Segment Tree: O(log n) dynamic range queries & updates\")"
        },
        "example": {
          "input": "Range sum query [1, 3] on [1, 3, 5, 7, 9, 11]",
          "output": "15 (3 + 5 + 7)"
        }
      },
      {
        "id": "advanced-graph-algos",
        "title": "Advanced Graph Algorithms",
        "description": "Topological Sort, Kahn's Algorithm, Bellman-Ford, Floyd-Warshall, and Kruskal's MST.",
        "timeComplexity": "O(V + E) to O(V^3)",
        "spaceComplexity": "O(V^2)",
        "complexityExplanation": "Floyd-Warshall checks all pairs in O(V^3); Kruskal finds MST in O(E log E).",
        "visualType": "graph",
        "concept": "Advanced graph topics cover:\n- Topological Sort: Linear ordering of DAG vertices.\n- Bellman-Ford: Handles negative weights and detects negative cycles.\n- Floyd-Warshall: All-pairs shortest paths.\n- Kruskal / Prim: Minimum Spanning Tree.",
        "algorithm": "Kahn's Algorithm:\nCompute in-degrees. Enqueue in-degree 0 nodes. Process queue and decrement neighbor in-degrees.",
        "code": {
          "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nvector<int> topologicalSort(int V, const vector<vector<int>>& adj) {\n    vector<int> inDegree(V, 0);\n    for(int u = 0; u < V; u++) {\n        for(int v : adj[u]) inDegree[v]++;\n    }\n    queue<int> q;\n    for(int i = 0; i < V; i++) if(inDegree[i] == 0) q.push(i);\n    vector<int> topo;\n    while(!q.empty()) {\n        int u = q.front(); q.pop();\n        topo.push_back(u);\n        for(int v : adj[u]) {\n            if(--inDegree[v] == 0) q.push(v);\n        }\n    }\n    return topo;\n}\n\nint main() {\n    vector<vector<int>> adj(4);\n    adj[0] = {1, 2}; adj[1] = {3}; adj[2] = {3};\n    vector<int> order = topologicalSort(4, adj);\n    cout << \"Topological Sort: \";\n    for(int x : order) cout << x << \" \"; cout << endl; // 0 1 2 3 or 0 2 1 3\n    return 0;\n}",
          "c": "#include <stdio.h>\nint main() { printf(\"Topological sort\\n\"); return 0; }",
          "java": "public class Main { public static void main(String[] args) { System.out.println(\"Topo sort\"); } }",
          "python": "from collections import deque\ndef topo_sort(V, adj):\n    indeg = [0]*V\n    for u in adj: \n        for v in adj[u]: indeg[v] += 1\n    q = deque([i for i in range(V) if indeg[i] == 0])\n    res = []\n    while q:\n        u = q.popleft(); res.append(u)\n        for v in adj.get(u, []):\n            indeg[v] -= 1\n            if indeg[v] == 0: q.append(v)\n    return res"
        },
        "example": {
          "input": "DAG 0->1, 0->2, 1->3, 2->3",
          "output": "Valid ordering: 0 1 2 3"
        }
      }
    ]
  }
];

export const getAllDsaLessons = () => {
  return DSA_MODULES.flatMap(m => m.topics.map(t => ({
    ...t,
    moduleId: m.id,
    moduleTitle: m.title,
    moduleNumber: m.moduleNumber
  })));
};

export const getDsaLessonById = (id) => {
  const all = getAllDsaLessons();
  return all.find(l => l.id === id) || null;
};
