function top_row(k, arr) {
    switch (k) {
        case 'q':
            arr[0] = !(arr[0]);
            break;
        case 'w':
            arr[1] = !(arr[1]);
            break;
        case 'e':
            arr[2] = !(arr[2]);
            break;
        case 'r':
            arr[3] = !(arr[3]);
            break;
        case 't':
            arr[0] = !(arr[0]);
            break;
        case 'y':
            arr[4] = !(arr[4]);
            break;
        case 'u':
            arr[5] = !(arr[5]);
            break;
        case 'i':
            arr[6] = !(arr[6]);
    }
    return arr;
}

function middle_row(k, arr) {
    switch (k) {
        case 'a':
            arr[0] = !(arr[0]);
            break;
        case 's':
            arr[1] = !(arr[1]);
            break;
        case 'd':
            arr[2] = !(arr[2]);
            break;
        case 'f':
            arr[3] = !(arr[3]);
            break;
        case 'g':
            arr[0] = !(arr[0]);
            break;
        case 'h':
            arr[4] = !(arr[4]);
            break;
        case 'j':
            arr[5] = !(arr[5]);
            break;
        case 'k':
            arr[6] = !(arr[6]);
    }
    return arr;
}
