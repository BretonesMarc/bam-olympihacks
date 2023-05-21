# Bam OlympiHacks '23
Blockchain at McGill's Team Submission for University of Waterloo's "Olympihacks" Blockchain Hackathon

# Jackal File Upload Setup

1. Install Go from: https://go.dev/dl/
2. Add the below lines to '.bash_proile' (cd ~ and ls -a).
   export PATH=$PATH:/usr/local/go/bin
   export GOPATH=$HOME/go
   export PATH=$PATH:$GOPATH/bin
3. Command: git clone https://github.com/JackalLabs/DelphiHack.git
4. Command: cd server
5. Change `https://jackalplswork.com` to `https://server1.napkinmath.cloud` in 'server/jstore/server/server.go'.
6. Command: make install
7. Command: jstored client gen-key (and make a note of the jackal address).
8. Send this address to Faucet channel in discord for some JKL tokens.
9. Command: jstored client config node https://rpc.jackalprotocol.com:443
10. Command: jstored start
11. You can now upload a file in an http form with the name `file` to `localhost:2929/upload`.
12. You can download the file using 'https://server1.napkinmath.cloud/download/{fid}'.

# Use only index.html for webpage with 'Upload' button.
