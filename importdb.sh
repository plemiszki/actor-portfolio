#!/bin/bash
rm latest.dump
heroku pg:backups:capture --app actor-portfolio
heroku pg:backups:download --app actor-portfolio
pg_restore --verbose --clean --no-acl --no-owner -h localhost -d actor-portfolio_development latest.dump
rm latest.dump
echo Production Database Imported!
