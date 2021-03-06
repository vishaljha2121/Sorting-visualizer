
export const BubbleSortDesc = {
        title: 'Bubble Sort',
        description: (
          <p>
            <a
              href="https://en.wikipedia.org/wiki/Bubble_sort"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bubble Sort
            </a>{' '}
            is a simple sorting algorithm that repeatedly steps through the
            list, compares adjacent elements and swaps them if they are in the
            wrong order.The pass through the list is repeated until the list
            is sorted. The algorithm, which is a comparison sort, is named for
            the way smaller or larger elements "bubble" to the top of the
            list. Although the algorithm is simple, it is too slow and
            impractical for most problems
          </p>
        ),
        worstCase: (
          <span>
            O(n<sup>2</sup>)
          </span>
        ),
        avgCase: (
          <span>
            O(n<sup>2</sup>)
          </span>
        ),
        bestCase: <span>O(n)</span>,
        space: <span>O(1)</span>
};


export const QuickSortDesc = {
        title: 'Quick Sort',
        description: (
          <div>
            <p>
              <a
                href="https://en.wikipedia.org/wiki/Quicksort"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quick Sort
              </a>{' '}
              is an efficient, in-place sorting algorith that in practice is
              faster than MergeSort and HeapSort. However, it is not a stable
              sorting algorithm, meaning that the relative positioning of
              equal sort items is not preserved.Quicksort is a divide and
              conquer algorithm. Quicksort first divides a large array into
              two smaller sub-arrays: the low elements and the high elements.
              Quicksort can then recursively sort the sub-arrays. The steps
              are:
            </p>
            <ol>
              <li>
                Pick an element, called a pivot, from the array. This is
                usually done at random.
              </li>
              <li>Move pivot element to the start of the array.</li>
              <li>
                <em>Partitioning:</em> reorder the array so that all elements
                with values less than the pivot come before the pivot, while
                all elements with values greater than the pivot come after it
                (equal values can go either way). After this partitioning, the
                pivot is in its final position. This is called the{' '}
                <em>partition</em> operation.
              </li>
              <li>
                Recursively apply the above steps to the sub-array of elements
                with smaller values and separately to the sub-array of
                elements with greater values.
              </li>
            </ol>
            <p>
              The base case of the recursion is an array of size zero or one,
              which are sorted by definition.
            </p>
          </div>
        ),
        worstCase: (
          <span>
            O(<em>n</em>
            <sup>2</sup>)
          </span>
        ),
        avgCase: (
          <span>
            O(<em>n</em>log<em>n</em>)
          </span>
        ),
        bestCase: (
          <span>
            O(<em>n</em>log<em>n</em>)
          </span>
        ),
        space: (
          <span>
            O(log<em>n</em>)
          </span>
        )
};

export const MergeSortDesc = {
        title: 'Merge Sort',
        description: (
          <div>
            <p>
              <a
                href="https://en.wikipedia.org/wiki/Merge_sort"
                target="_blank"
                rel="noopener noreferrer"
              >
                Merge Sort
              </a>{' '}
              is an efficient, stable sorting algorith that makes use of the
              divide and conquer strategy. Conceptually the algorithm works as
              follows:
            </p>
            <ol>
              <li>
                Divide the unsorted list into <em>n</em> sublists, each
                containing one element(a list of one element is considered
                sorted)
              </li>
              <li>
                Repeatedly merge sublists to produce new sorted sublists until
                there is only one sublist remaining. This will be the sorted
                list.
              </li>
            </ol>
          </div>
        ),
        worstCase: (
          <span>
            O(<em>n</em> log <em>n</em>)
          </span>
        ),
        avgCase: (
          <span>
            O(<em>n</em> log <em>n</em>)
          </span>
        ),
        bestCase: (
          <span>
            O(<em>n</em> log <em>n</em>)
          </span>
        ),
        space: (
          <span>
            O(<em>n</em>)
          </span>
        )
};
