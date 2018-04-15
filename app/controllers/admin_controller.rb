class AdminController < ApplicationController

  include Clearance::Controller
  
  before_action :require_login

end
