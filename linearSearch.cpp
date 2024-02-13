#include<iostream>
using namespace std;

int search(int arr[], int n, int key){
    for(int i = 0; i < n; i++){
        if(arr[i] == key)
            return i;
    }
    return -1;
}

int main(){
    int n = 0;
    cin >> n;
    int arr[] = {1,2,3,4,5,7};
    cout << search(arr, n, 5);
}