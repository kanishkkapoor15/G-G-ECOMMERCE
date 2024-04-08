import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './DesignTshirt.css';
import html2canvas from 'html2canvas'; // Import html2canvas library
import whiteTshirt from './assets/images/white.jpg';
// import greenTshirt from './assets/images/green.jpg';
// import maroonTshirt from './assets/images/mehroon.jpg';
// import navyBlueTshirt from './assets/images/navyblue.jpg';
// import redTshirt from './assets/images/red.jpg';
// import yellowTshirt from './assets/images/yellow.jpg';
import cityImage from './assets/img/image1.jpg';
import criticsImage from './assets/img/image2.jpg';
import flowerImage from './assets/img/image3.jpg';
import illustrationImage from './assets/img/image4.jpg';
import menOversizedFront from './assets/images/men-oversized-front.png';
import menOversizedBack from './assets/images/men-oversized-back.png';
import womenCropFront from './assets/images/women-crop-front.png';
import womenCropBack from './assets/images/women-crop-back.png';
import pImage5 from './assets/img/image5.jpg';
import pImage6 from './assets/img/image6.jpg';
import pImage7 from './assets/img/image7.jpg';



const DesignTshirt = () => {

    const history = useNavigate(); // Initialize useHistory for routing
    const [uploadedImage, setUploadedImage] = useState(null);


    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const [snapshotUrl, setSnapshotUrl] = useState(null); // Declare snapshotUrl state and its setter function
    const[remarks,setRemarks]=useState('');


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUploadedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (event) => {
        setRemarks(event.target.value);
    };

    const handleSaveClick = () => {
        // Here you can perform the logic to save the remarks, such as sending them to a server or storing them in local storage
        setFinalImage(prevState => ({
            ...prevState,
            editable: false
        }));
        sessionStorage.setItem('finalImage', JSON.stringify(finalImage));
    
        alert('Response has been recorded')
        console.log('Remarks saved:', remarks);
        // Optionally, you can clear the input field after saving the remarks
        
    };

    // const imageRef = useRef(null);


    const products = [
        { name: 'Men Oversized', value: { front: menOversizedFront, back: menOversizedBack } },
        { name: 'Women Crop', value: { front: womenCropFront, back: womenCropBack } }
    ];

    const handleProductChange = (event) => {
        const productName = event.target.value;
        const selectedProduct = products.find(product => product.name === productName);
        setSelectedProduct(selectedProduct);
        event.target.blur(); // Blur the select element to prevent it from closing
        setFinalImage(prevState => ({
            ...prevState,
            productName: selectedProduct.name
            
        }))
    };
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };
    const resetSelection = () => {
        setSelectedProduct(null);
        setDropdownOpen(!dropdownOpen);
    };


    const defaultTextColor ="#c0c0c0";
    const defaultFontSize = "16px"; // Default font size
    const [finalImage, setFinalImage] = useState({
        tshirt: whiteTshirt,
        textFields: [{
            text: "",
            textLeft: "150px",
            textTop: "250px",
            textSize: "16",
            textColor: defaultTextColor,
            textBold: false,
            textItalic: false,
            textUnderline: false,
        }],
        quantity: "1",
        size: "M",
        editable: true,
        img: null,
        icon: null,
        imgStyle: { left: '0px', top: '0px' }, // Initialize imgStyle for image position
        productName:""
    });

    // Function to update text color
    const updateColor = (color) => {
        const updatedFields = finalImage.textFields.map(field => ({
            ...field,
            textColor: color || defaultTextColor // Use default color if empty string is provided
        }));
        setFinalImage(prevState => ({ ...prevState, textFields: updatedFields }));
    };

    // // Function to toggle font italic
    // const toggleItalic = () => {
    //     setFinalImage(prevState => ({ ...prevState, textItalic: !prevState.textItalic }));
    // };
    
    // // Function to toggle text underline
    // const toggleUnderline = () => {
    //     setFinalImage(prevState => ({ ...prevState, textUnderline: !prevState.textUnderline }));
    // };

    // Function to update font size
    const updateFontSize = (size) => {
        const parsedSize = parseInt(size);
        if (!isNaN(parsedSize)) {
            const updatedFields = finalImage.textFields.map(field => ({
                ...field,
                textSize: parsedSize > 0 ? `${parsedSize}px` : defaultFontSize // Use default font size if invalid or zero
            }));
            setFinalImage(prevState => ({ ...prevState, textFields: updatedFields }));
        }
    };

    const handleTextChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = finalImage.textFields.map((field, i) => {
            if (i === index) {
                return {
                    ...field,
                    [name]: value
                };
            }
            return field;
        });
        setFinalImage(prevState => ({ ...prevState, textFields: updatedFields }));
    };

    const duplicateTextField = (index) => {
        const newTextField = [...finalImage.textFields];
        const lastTextField = newTextField[index];
        const newTextFieldCopy = { ...lastTextField, text: "" };
        newTextField.splice(index + 1, 0, newTextFieldCopy);
        setFinalImage(prevState => ({ ...prevState, textFields: newTextField }));
    };

    const removeTextField = (index) => {
        const newTextField = [...finalImage.textFields];
        newTextField.splice(index, 1);
        setFinalImage(prevState => ({ ...prevState, textFields: newTextField }));
    };

    const handleMouseDown = (event, index) => {
        const shiftX = event.pageX - event.target.getBoundingClientRect().left;
        const shiftY = event.pageY - event.target.getBoundingClientRect().top;

        const moveText = (pageX, pageY) => {
            const newTextField = [...finalImage.textFields];
            newTextField[index].textLeft = pageX - shiftX - document.getElementById("tshirtBoard").getBoundingClientRect().left + 'px';
            newTextField[index].textTop = pageY - shiftY - document.getElementById("tshirtBoard").getBoundingClientRect().top + 'px';
            setFinalImage(prevState => ({ ...prevState, textFields: newTextField }));
        };

        const onMouseMove = (event) => {
            moveText(event.pageX, event.pageY);
        };

        document.addEventListener('mousemove', onMouseMove);

        event.target.onmouseup = () => {
            document.removeEventListener('mousemove', onMouseMove);
            event.target.onmouseup = null;
        };

        event.preventDefault();
    };


    
    const handleImageClick = (source, offsetX, offsetY) => {
        setFinalImage(prevState => ({
            ...prevState,
            img: source,
            icon: null, // Clear icon if an image is selected
            imgStyle: { left: `${offsetX}px`, top: `${offsetY}px` } // Set image position based on offset
        }));
    };

    const handleImageDrop = (event) => {
    event.preventDefault();
    const source = event.dataTransfer.getData("source");
    const rect = event.target.getBoundingClientRect(); // Get the bounding rect of the tshirt board container
    const offsetX = event.clientX - rect.left; // Calculate the offset relative to the container
    const offsetY = event.clientY - rect.top; // Calculate the offset relative to the container
    handleImageClick(source, offsetX, offsetY);
};
    const handleIconClick = (source) => {
        setFinalImage(prevState => ({
            ...prevState,
            img: null, // Clear image if an icon is selected
            icon: source
        }));
    };
    
    
    
    const handleIconDrop = (event) => {
        event.preventDefault();
        const source = event.dataTransfer.getData("source");
        handleIconClick(source);
    };
    
    const handleDragOver = (event) => {
        event.preventDefault();
        // Calculate the new position of the image based on the mouse position
        const newPositionX = event.clientX - event.target.getBoundingClientRect().left;
        const newPositionY = event.clientY - event.target.getBoundingClientRect().top;
    
        // Update the style properties of the image
        if (finalImage.img) {
            setFinalImage(prevState => ({
                ...prevState,
                imgStyle: {
                    ...prevState.imgStyle,
                    left: `${newPositionX}px`,
                    top: `${newPositionY}px`
                }
            }));
        }
    };
    
    const handleDragStart = (event, source) => {
        event.dataTransfer.setData("source", source);
    };
    

    const saveChanges = async () => {
        setFinalImage(prevState => ({
            ...prevState,
            editable: false
        }));
        sessionStorage.setItem('finalImage', JSON.stringify(finalImage));
    
        try {
            // Capture screenshot and save it in the state
            const imageData = await captureScreenshot();
            console.log("Image data is : ",imageData)
    
            // Prepare data to send to the backend API
            const formData = new FormData();
            formData.append('productImage', imageData);
            formData.append('productQuantity', finalImage.quantity);
            formData.append('productType', finalImage.productName);
            formData.append('productSize', finalImage.size);
            formData.append('productRemarks', remarks);
    
            // Send POST request to the backend API
            const response = await fetch('http://localhost:4000/process-custom-order', {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('auth-token') // Include auth-token in the header
                },
                body: formData
            });
    
            if (response.ok) {
                // Order processed successfully
                console.log('Order processed successfully');
                alert("'Order processed successfully'");
                history('/ThankYou');
                // Optionally, you can redirect the user to a success page or show a success message
            } else {
                // Failed to process order
                console.error('Failed to process order');
                alert("Failed to process order")
                // Optionally, you can show an error message to the user
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle any errors that occurred during the request
            alert("An error occurred while processing the order");
        }
    };
    
    const captureScreenshot = () => {
        return new Promise((resolve, reject) => {
            const tshirtBoard = document.getElementById('tshirtBoard');
            html2canvas(tshirtBoard).then(canvas => {
                // Convert canvas to Blob
                canvas.toBlob(blob => {
                    if (!blob) {
                        reject(new Error('Failed to capture screenshot: Blob is null'));
                        return;
                    }
                    
                    // Create a file object from the Blob
                    const file = new File([blob], 'screenshot.png', { type: 'image/png' });
                    resolve(file); // Resolve the promise with the file object
                }, 'image/png'); // Specify the image format
            }).catch(error => {
                console.error('Error capturing screenshot:', error);
                reject(error); // Reject the promise with the error
            });
        });
    };
    


return (
    <div>
        <div className="popup" id="popup">
            <div id="modal">
                <div className="finalBoard" id="finalBoard">
                    <img id="final-img" src={finalImage.tshirt} alt="" />
                    <p id="finaltext" style={{ top: finalImage.textTop, left: finalImage.textLeft, position: "absolute", fontWeight: finalImage.textBold, fontStyle: finalImage.textItalic, textDecoration: finalImage.text_underline, fontSize: finalImage.textSize, color: finalImage.textColor }}>{finalImage.text}</p>
                    <div id="finalimage">
                      {finalImage.icon ? <i className={finalImage.icon.classList}></i> : null}
                      {finalImage.img ? <img src={finalImage.img.src} alt="" /> : null}
                    </div>
                </div>
                <div className="information">
            <h1>Purchase Details</h1>
            <h4>This is your final product</h4>
            <div className="row">
                <span>Size</span>
                <p id="finalsizepreview">{finalImage.size}</p>
            </div>
            <div className="row">
                <span>Quantity</span>
                <p id="finalquantity">{finalImage.quantity}</p>
            </div>
            <div className="row">
                <span>Text</span>
                <p id="finaltextpreview">{finalImage.text}</p>
            </div>
            <div className="row">
                <span>Text Color</span>
                <input
                    type="color"
                    value={finalImage.textColor}
                    onChange={(e) => updateColor(e.target.value)}
                />
            </div>

            <div className="row">
                <span>Text Size</span>
                <input
                    type="text"
                    value={finalImage.textSize}
                    onChange={(e) => updateFontSize(e.target.value)}
                />
            </div>

            <div className="row">
                <span>Text Weight</span>
                <input
                    type="checkbox"
                    defaultChecked={finalImage.textBold === "bold"}
                    
                    id="text-bold"
                />
            </div>

            <div className="row">
                <span>Text Style</span>
                <input
                    type="checkbox"
                    defaultChecked={finalImage.textItalic === "italic"}
                    id="text-italic"
                />
            </div>

            <div className="row">
                <span>Text Decoration</span>
                <input
                    type="checkbox"
                    defaultChecked={finalImage.text_underline === "underline"}
                    id='text-underline'
                />
            </div>

            <button className="btn-light" id="close">Close</button>
        </div>
            </div>
         </div>

         <div className="container">
                <div className="sidebar">
                    <div className="heading">
                        <h1>Enter Text</h1>
                        <p>(*to be added on product)</p>
                    </div>

                    {finalImage.textFields.map((textField, index) => (
                        <div key={index} className="row">
                            <input
                                type="text"
                                className="fullWidth-input input2"
                                name="text"
                                value={textField.text}
                                onChange={(event) => handleTextChange(index, event)}
                                disabled={!finalImage.editable}
                                // onBlur={handleTextBlur}
                            />
                            <button onClick={() => duplicateTextField(index)}>+</button>
                            <button onClick={() => removeTextField(index)}>-</button>
                        </div>
                    ))}

                    <div className="row">
                        <label htmlFor="text-size">Font Size</label>
                        <input
                            className="small-input input2"
                            type="text"
                            id="text-size"
                            maxLength="2"
                            value={finalImage.textSize}
                            onChange={(e) => updateFontSize(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="bold">Font Bold</label>
                        <input
                            type="checkbox"
                            className="check input2"
                            id="text-bold"
                            defaultChecked={finalImage.textBold}
                            onChange={() => setFinalImage(prevState => ({
                                ...prevState,
                                textFields: prevState.textFields.map(field => ({
                                    ...field,
                                    textBold: !field.textBold
                                }))
                            }))}
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="italic">Italic</label>
                        <input
                            type="checkbox"
                            className="check input2"
                            id="text-italic"
                            defaultChecked={finalImage.textItalic}
                            onChange={() => setFinalImage(prevState => ({
                                ...prevState,
                                textFields: prevState.textFields.map(field => ({
                                    ...field,
                                    textItalic: !field.textItalic
                                }))
                            }))}
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="underline">Underline</label>
                        <input
                            type="checkbox"
                            className="check input2"
                            id="text-underline"
                            defaultChecked={finalImage.textUnderline} 
                            onChange={() => setFinalImage(prevState => ({
                                ...prevState,
                                textFields: prevState.textFields.map(field => ({
                                    ...field,
                                    textUnderline: !field.textUnderline
                                }))
                            }))}
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="text-color">Text Color</label>
                        <input
                            id="text-color"
                            type="color"
                            value={finalImage.textColor}
                            onChange={(e) => updateColor(e.target.value)}
                        />
                    </div>
                </div>
                <div className="main-content">
                    <div className="header">
                        <h1>Customize T-Shirt</h1>

                    </div>
                    <div id="tshirtBoard" className="tshirtBoard" onDrop={finalImage.icon ? handleIconDrop : handleImageDrop} onDragOver={handleDragOver}>
                          {selectedProduct && (
                              <div className="product-images">
                                  <img className="product-image-front" src={selectedProduct.value.front} alt="" />
                                  <img className="product-image-back" src={selectedProduct.value.back} alt="" />
                                                    </div>
                          )}
                      
                          {finalImage.textFields.map((textField, index) => (
                              <div
                                  key={index}
                                  onMouseDown={(event) => handleMouseDown(event, index)} // Pass index to identify the text field
                                  style={{
                                      color: textField.textColor,
                                      fontWeight: textField.textBold ? "bold" : "normal",
                                      fontStyle: textField.textItalic ? "italic" : "normal",
                                      textDecoration: textField.textUnderline ? "underline" : "none",
                                      fontSize: textField.textSize,
                                      left: textField.textLeft,
                                      top: textField.textTop,
                                      position: 'absolute',
                                      zIndex: 1000
                                  }}
                              >
                                  {textField.text}
                              </div>
                          ))}
                      
                          {/* Render the selected image or icon */}
                          {finalImage.icon && (
                              <i 
                              className={finalImage.icon}
                               style={{ position: 'absolute', top: 0, left: 0 }}
                               draggable="true"
                               onDragStart={(event) => handleDragStart(event, 'icon')}
                               ></i>
                          )}
                          {finalImage.img && (
                               <img 
                                   src={finalImage.img} 
                                   style={{ 
                                       position: 'absolute', 
                                       ...finalImage.imgStyle, // Apply the style properties
                                       width: '100px', 
                                       height: '100px', 
                                       cursor: 'move' 
                                   }} 
                                   alt=""
                                   draggable="true"
                                   onDragStart={() => {}}
                                   onDragOver={handleDragOver} // Handle the drag over event
                               />
                           )}
                      </div>

                
                     <div className="collection-row">
                       <label htmlFor="product-select">Select Product:</label>
                <select
                    id="product-select"
                    onChange={handleProductChange}
                    onClick={toggleDropdown}
                    onBlur={closeDropdown}
                    value={selectedProduct ? selectedProduct.name : ''}
                >
                    <option value="">Select</option>
                    {products.map((product, index) => (
                        <option key={index} value={product.name}>{product.name}</option>
                    ))}
                </select>
                <br />

                </div>
                <br />
                
                
             <div className='reset-selection'>
             <button className='reset-button' onClick={resetSelection}>Reset Selection</button>

             </div>
             
            <div className="final-remarks">

             <span><h1>Add Remarks</h1></span><br />

            <div className="final-remarks-content">

            <input 
                type="text" 
                value={remarks} 
                onChange={handleInputChange} 
                placeholder="Enter remarks..."
            />

            </div>
            <button onClick={handleSaveClick}>Save</button>
        </div>

        </div>

        <div className="sidebar2">
            <div className="heading margin-top-10">
                <h4>Select Your Size</h4>
            </div>
            <div className="row">
                <input className="label-control-check" type="checkbox" name="size" value="Small" id="1" onClick={(e) => setFinalImage(prevState => ({ ...prevState, size: e.target.value }))} />
                <label className="label-control" htmlFor="1">S</label>
                <input className="label-control-check" type="checkbox" name="size" id="2" value="Medium" onClick={(e) => setFinalImage(prevState => ({ ...prevState, size: e.target.value }))} />
                <label className="label-control" htmlFor="2">M</label>
                <input className="label-control-check" type="checkbox" name="size" id="3" value="Large" onClick={(e) => setFinalImage(prevState => ({ ...prevState, size: e.target.value }))} />
                <label className="label-control" htmlFor="3">L</label>
                <input className="label-control-check" type="checkbox" name="size" id="4" value="Extra Large" onClick={(e) => setFinalImage(prevState => ({ ...prevState, size: e.target.value }))} />
                <label className="label-control" htmlFor="4">XL</label>
                <input className="label-control-check" type="checkbox" name="size" id="5" value="XXL" onClick={(e) => setFinalImage(prevState => ({ ...prevState, size: e.target.value }))} />
                <label className="label-control" htmlFor="5">XXL</label>
            </div>
            <div className="row">
                <label htmlFor="quantity">Quantity</label>
                <input className="small-input input2" type="text" id="quantity" maxLength="3" onChange={(e) => setFinalImage(prevState => ({ ...prevState, quantity: e.target.value }))} />
            </div>
            <div className="heading row">
                <h4>Add Image on tshirt</h4>
               
            </div>
            
        <div className="row">

            <div className="image-selector" id="image-selector">
              <img
               className="item"
                src={cityImage}
               draggable
               onDragStart={(e) => handleDragStart(e, cityImage)}
               alt=""
              />
             < img
                   className="item"
                   src={criticsImage}
                   draggable
                   onDragStart={(e) => handleDragStart(e, criticsImage)}
                   alt=""
               />
             <img
                 className="item"
                 src={flowerImage}
                 draggable
                 onDragStart={(e) => handleDragStart(e, flowerImage)}
                 alt=""
             />
             <img
                  className="item"
                 src={illustrationImage}
                 draggable
                  onDragStart={(e) => handleDragStart(e, illustrationImage)}
                  alt=""
             />
              <img
                 className="item"
                 src={pImage5}
                 draggable
                 onDragStart={(e) => handleDragStart(e, pImage5)}
                 alt=""
             />
             <img
                 className="item"
                 src={pImage6}
                 draggable
                 onDragStart={(e) => handleDragStart(e, pImage6)}
                 alt=""
             />
             <img
                 className="item"
                 src={pImage7}
                 draggable
                 onDragStart={(e) => handleDragStart(e, pImage7)}
                 alt=""
             />
              
            </div>
        </div>
        <div className="row">
             <div className="upload-design">
                <label htmlFor="upload-image">Upload Image</label>
                
                <input type="file" id="upload-image" onChange={handleImageUpload} accept="image/*" />
                </div>
        </div>
        <div className="upload-design-image">
        {uploadedImage && (
                <img
                    src={uploadedImage}
                    className="item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, uploadedImage)}
                    alt="Uploaded-Image"
                />
            )}
        </div>
         <div className="row">
                
                <button onClick={saveChanges} >Order Now</button> {/* Button to save changes */}
            </div>
            {/* {snapshotUrl && <img src={snapshotUrl} alt="Snapshot" />} */}
        </div>
        
    </div>
</div>
);
};

export default DesignTshirt;
