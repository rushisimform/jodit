import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';


const App = ({ placeholder }) => {
	const editor = useRef(null);
  const [data, setData] = useState('');

  const copyStringToClipboard = function(str) {
    var el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const facilityMergeFields = [
    "FacilityNumber",
    "FacilityName",
    "Address",
    "MapCategory",
    "Latitude",
    "Longitude",
    "ReceivingPlant",
    "TrunkLine",
    "SiteElevation"
  ];
  const inspectionMergeFields = [
    "InspectionCompleteDate",
    "InspectionEventType"
  ];
  const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
    let optionGroupElement = document.createElement("optgroup");
    optionGroupElement.setAttribute("label", optionGrouplabel);
    for (let index = 0; index < mergeFields.length; index++) {
      let optionElement = document.createElement("option");
      optionElement.setAttribute("class", "merge-field-select-option");
      optionElement.setAttribute("value", mergeFields[index]);
      optionElement.text = mergeFields[index];
      optionGroupElement.appendChild(optionElement);
    }
    return optionGroupElement;
  }
  const buttons = [
    // "undo",
    // "redo",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "superscript",
    "subscript",
    "|",
    "paragraph",
    "fontsize",
    "font",
    "|",
    "ul",
    "ol",
    "align",
    "|",
    // "outdent",
    // "indent",
    // "|",
    "brush",
    "|",
    "image",
    "link",
    // "table",
    "|",
    // "hr",
    "eraser",
    // "copyformat",
    "|",
    // "fullsize",
    // "selectall",
    // "print",
    // "|",
    // "source",
    // "|",
    {
      name: "insertMergeField",
      tooltip: "Insert Merge Field",
      iconURL: "images/merge.png",
      popup: (editor, current, self, close) => {
        function onSelected(e) {
          let mergeField = e.target.value;
          if (mergeField) {
            console.log(mergeField);
            editor.selection.insertNode(
              editor.create.inside.fromHTML("{{" + mergeField + "}}")
            );
          }
        }
        let divElement = editor.create.div("merge-field-popup");
  
        let labelElement = document.createElement("label");
        labelElement.setAttribute("class", "merge-field-label");
        labelElement.text = 'Merge field: ';
        divElement.appendChild(labelElement);
  
        let selectElement = document.createElement("select");
        selectElement.setAttribute("class", "merge-field-select");
        selectElement.appendChild(createOptionGroupElement(facilityMergeFields, "Facility"));
        selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, "Inspection"));
        selectElement.onchange = onSelected;
        divElement.appendChild(selectElement);
  
        console.log(divElement);
        return divElement;
      }
    },
    {
      name: "copyContent",
      tooltip: "Copy HTML to Clipboard",
      iconURL: "images/copy.png",
      exec: function(editor) {
        let html = editor.value;
        copyStringToClipboard(html);
      }
    }
  ];
  
  const editorConfig = {
    readonly: false,
    toolbar: true,
    placeholder: placeholder || 'Start typings...',
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    buttons: buttons,
    uploader: {
      insertImageAsBase64URI: true, // Use base64 images in the editor content
    },
    width: 800,
    height: 842,
  };

  const handleSend = () => {
    const editorContent = editor.current.value;
    console.log("Editor Content:", editorContent);
    // Here you can send the content to a server or perform other actions
  };

	return (
    <div className="App" style={{ maxWidth: editorConfig.width, margin: "0 auto", paddingTop:'40px' }}>
		<JoditEditor
			ref={editor}
			value={data}
			config={editorConfig}
			tabIndex={1} // tabIndex of textarea
			// onBlur={newContent => setData(newContent)} // preferred to use only this option to update the content for performance reasons
      // onChange={value => setData(value)}
		/>
     <button onClick={handleSend} style={{ marginTop: '20px' }}>Send</button>
    </div>
	);
};

export default App;