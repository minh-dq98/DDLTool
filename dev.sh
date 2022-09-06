#!/bin/bash

cd `dirname $0`
source .env
name="npm ($PROJECT_NAME)"
cmd="npm run dev"
pid="/tmp/${PROJECT_NAME}_npm.pid"
pgrep_nuxt="`pwd`.*nuxt"

case "$1" in 
start)
   if [ -e $pid ]; then
      echo $name is already running, pid=`cat $pid` 
      pgrep -f $pgrep_nuxt -a
   else
      printf "starting $name ... "
      eval "$cmd &" && echo $!>$pid
      echo "done, pid=`cat $pid`"
   fi
   ;;
stop)
   proc=`pgrep -f $pgrep_nuxt -a`
   [ -e $pid ] && kill -SIGKILL `cat $pid` &> /dev/null && echo "killed process `cat $pid` $cmd"
   kill -SIGKILL `pgrep -f $pgrep_nuxt` &> /dev/null && echo "killed process $proc"
   rm $pid &> /dev/null
   echo "$name stopped"
   ;;
restart)
   $0 stop && sleep 1 && $0 start
   ;;
status)
   if [ -e $pid ]; then
      echo $name is running, pid=`cat $pid`
      pgrep -f $pgrep_nuxt -a
   else
      echo $name is NOT running
      exit 1
   fi
   ;;
-h)    
   echo "Usage: $0 {start|stop|status|restart}"
   $0 status
   ;;
*)
   $0 start
   ;;
esac

exit 0 
