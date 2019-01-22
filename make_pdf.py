
 import pdfkit

 template = get_template("output_pdf.html")
 context = Context({"data": data})  # data is the context data that is sent to the html file to render the output. 
 html = template.render(context)  # Renders the template with the context data.
 pdfkit.from_string(html, 'out.pdf')
 pdf = open("out.pdf")
 response = HttpResponse(pdf.read(), content_type='application/pdf')  # Generates the response as pdf response.
 response['Content-Disposition'] = 'attachment; filename=output.pdf'
 pdf.close()
 os.remove("out.pdf")  # remove the locally created pdf file.
 return response  # returns the response.