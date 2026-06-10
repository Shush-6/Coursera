#include <bits/stdc++.h>
using namespace std;
 
#define endl '\n'
#define int long long
 const int mod = 1e9+7;
 
// Never forget how widely capable you are.
// Chase Excellence to Escape mediocrity.
//Don't leave until you do it, It is Easy trust yourself.
 
/*  Thought process

*/
int dynamic(int n,vector<int>& dp){
    if(n==0){
        return 1;
    }
    if(dp[n]!=-1){
        return dp[n];
    }
    int sum = 0;
    for(int i=1;i<=6;i++){
        if(n-i>=0){
            sum=(sum+dynamic(n-i,dp))%mod;
        }
    }
    return dp[n] = sum%mod;
}
void solve(){
   int n;
   cin >> n;  
   vector<int>dp(n+1,-1);
cout << dynamic(n,dp) << endl;
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