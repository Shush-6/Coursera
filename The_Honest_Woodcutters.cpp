#include <bits/stdc++.h>
using namespace std;
 
#define endl '\n'
#define int long long
 
 
// Never forget how widely capable you are.
// Chase Excellence to Escape mediocrity.
//Don't leave until you do it, It is Easy trust yourself.
 
/*  Thought process

*/
void solve(){
      int n;
      cin >> n;
      vector<int>a(n);
        for(int i=0;i<n;i++){
            cin >> a[i];
        }
        vector<int>b(n);
        for(int i=0;i<n;i++){
            cin >> b[i];
        }
        for(int i=0;i<n;i++){
            if(a[i]==b[i]){
                cout << "No" << endl;
                return;
            }
        }
        cout << "Yes" << endl;
}
signed main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    // int t;
    // cin >> t;
    // while(t--){
        solve();
    // }
    return 0;
}