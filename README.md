to run consul:
`consul agent -dev -ui`


to run haproxy:
`consul-template -consul-addr="localhost:8500" -template="/opt/homebrew/etc/haproxy.ctmpl:/opt/homebrew/etc/haproxy.cfg:brew services restart haproxy"`


consul is accessible via http://localhost:8500/ui/

haproxy is accessible via http://localhost:8487/stats
