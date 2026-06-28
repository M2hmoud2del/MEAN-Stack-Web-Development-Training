//1️⃣ Check if Array is Sorted
function isSorted(arr) {

    for (let i = 0; i < arr.length - 1; i++) {

        if (arr[i] > arr[i + 1]) {
            return false;
        }

    }

    return true;

}

console.log(isSorted([1, 2, 3, 4]));
console.log(isSorted([1, 5, 3]));


//2️⃣ Return Numbers Greater Than a Value


function greaterThan(arr, value) {

    let result = [];

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] > value) {
            result.push(arr[i]);
        }

    }

    return result;

}

console.log(greaterThan([5, 7, 1, 9, 3], 4));

//3️⃣ Plus One (LeetCode)

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {

    for (let i = digits.length - 1; i >= 0; i--) {

        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }

        digits[i] = 0;

    }

    digits.unshift(1);

    return digits;

};

4️⃣ Remove Duplicates from Sorted Array (LeetCode)

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {

    if (nums.length == 0) {
        return 0;
    }

    let index = 0;

    for (let i = 1; i < nums.length; i++) {

        if (nums[i] != nums[index]) {
            index++;
            nums[index] = nums[i];
        }

    }

    return index + 1;

};
