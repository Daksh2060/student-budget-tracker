pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.js';

document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file.type !== "application/pdf") {
        console.error(file.name, "is not a pdf file.")
        return;
    }

    var fileReader = new FileReader();  
    fileReader.onload = function(ev) {
        var typedarray = new Uint8Array(ev.target.result);
        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
            console.log('PDF loaded');

            pdf.getPage(1).then(function(page) {
                page.getTextContent().then(function(textContent) {
                    let finalString = '';
                    textContent.items.forEach(function(textItem) {
                        finalString += textItem.str + " ";
                    });
                    console.log(finalString);

                    let tuitionRegex = /Total Activity\s+(\d+,\d{1,3}\.\d{2}|\d+\.\d{2})/;
                    let tuitionMatch = finalString.match(tuitionRegex);
                    let totalTuition = 0;
                    if (tuitionMatch && tuitionMatch[1]) {
                        totalTuition = parseFloat(tuitionMatch[1].replace(',', '')); 
                    } else {
                        console.log("Cannot find total tuition.");
                    }

                    let upassRegex = /U-Pass BC Fee Assessment\s+(\d+,\d{1,3}\.\d{2}|\d+\.\d{2})/;
                    let upassMatch = finalString.match(upassRegex);
                    let upassFee = 0;
                    if (upassMatch && upassMatch[1]) {
                        upassFee = parseFloat(upassMatch[1].replace(',', ''));
                        document.getElementById('inputTransport').value = upassFee.toFixed(2);
                    } else {
                        console.log("Cannot find U-Pass fee.");
                    }

                    let gymFeeRegex = /UG Rec & Athletic Fee\s+(\d+,\d{1,3}\.\d{2}|\d+\.\d{2})/;
                    let gymFeeMatch = finalString.match(gymFeeRegex);
                    let gymFee = 0;
                    if (gymFeeMatch && gymFeeMatch[1]) {
                        gymFee = parseFloat(gymFeeMatch[1].replace(',', ''));
                        document.getElementById('inputGym').value = gymFee.toFixed(2);
                    } else {
                        console.log("Cannot find gym fee.");
                    }

                    let netTuition = totalTuition - upassFee - gymFee;
                    document.getElementById('inputTuition').value = netTuition.toFixed(2);
                });
            });
        });
    };

    fileReader.readAsArrayBuffer(file);
}, false);
