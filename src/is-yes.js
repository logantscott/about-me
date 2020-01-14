export function isYes(ans) {
    const yess = ['yes', 'y', 'ya', 'yah', 'yep', 'yup'];
    if (yess.indexOf(ans) !== -1) {
        return true;
    } else return false;
}

export function isNo(ans) {
    const nos = ['no', 'n', 'nein', 'nah', 'neg', 'nope'];
    if (nos.indexOf(ans) !== -1) {
        return true;
    } else return false;
}

export function lcase(ans) {
    return ans.toLowerCase();
}