module ApplicationHelper

  def markdown(text, options = {})
    renderer = Redcarpet::Render::HTML.new({})
    markdown = Redcarpet::Markdown.new(renderer, {})
    result = markdown.render(text)
    result.gsub!('<a href=', '<a target="_blank" href=')
    result.html_safe
  end

end
