var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{
        'size': ['small', false, 'large', 'huge']
    }], // custom dropdown
    [{
        'font': []
    }],
    [{
        'align': []
    }],
    [{
        'list': 'ordered'
    }, {
        'list': 'bullet'
    }],
    ['blockquote'],
    [{
        'script': 'sub'
    }, {
        'script': 'super'
    }], // superscript/subscript
];
var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: '#toolbar'
    },
});
var standardBox = document.getElementById("standardBox");
function checkStandardsOpen() {
    var standardBox = document.getElementById("floating-window");
    if (standardBox != null) {
        var style = window.getComputedStyle(standardBox, null).display;
        if (style == "none") {
            console.log(style)
            standardBox.style = "block";
            return true;
        } else if (style == "block") {
            return true;
        }

    } else {
        console.log("null");
        return false;
    }
}
function upload() {
    if (checkStandardsOpen) { //also checks if they exist 
        var checkboxes = document.querySelectorAll('input[type=checkbox]');
        var obj = {
            data: {

            }
        };
        checkboxes.forEach((checkbox) => {
            obj.data[checkbox.getAttribute("name")] = checkbox.checked; //create array with the name and state of every checkbox on the form
			//Adds a button that says standard was selected
			if(checkbox.checked){
				GenerateBubble(checkbox);
			}
			//remove the unchecked standards
			if(!checkbox.checked){
				var tempName =checkbox.id.toString() + "s";
				if(tempName)
				var element = document.getElementById(tempName);
				if(element){
					element.parentNode.removeChild(element);
				}
    				
  }

			
        });
        $.ajax({
            type: "POST",
            url: "../../phpFunctions/uploatStandards.php",
            data: {
                user: sessionStorage.getItem("username"),
                data: JSON.stringify(obj.data)
            },
            success: function (ServerData) {
                console.log(ServerData);
                console.log(JSON.stringify(obj.data));
        }
        });
		//I dont think it should be submitted after adding standards.
        //submit();
    } else {
       // alert("please add some standards to your Lesson");
    }
}

function GenerateBubble(checkbox){
	const smallDiv = document.createElement("div");
	smallDiv.id = checkbox.id + "s";
	if (!document.getElementById(smallDiv.id)){
	const mainDiv = document.getElementById("selected_standards");
    smallDiv.textContent = checkbox.id;
    mainDiv.appendChild(smallDiv);
}
}
function submit() {
    var title = document.getElementById('LessonTitle').value;
    var startDate = document.getElementById('LessonStartDate').value;
    var endDate = document.getElementById('LessonEndDate').value;
    var userInput = document.getElementById('editor').innerHTML;
    var doc = new jsPDF();

    //pdf template that user input gets added to
    var html =
        '<h1 style="font-size:8px;">' + title + '</h1>' +
        '<br>' +
        '<h3>' + 'Start: ' + startDate + '</h3>' +
        '<h3>' + 'End: ' + endDate + '</h3>' +
        '<br>' +
        userInput;
    //create the pdf
    doc.fromHTML(
        html,
        15,  //top margin
        15,  //left margin
        {
            'width': 170 //idk what the units are here
        }
    );

    //maybe prompt the user for what they want the name of the file to be
    doc.save("Test.pdf");
}

function openFloatingWindow() {
    var windowHeight = window.innerHeight;
    var margin = 5;
    var maxHeight = (windowHeight * (90 - 2 * margin)) / 100;

    var floatingWindow = document.createElement("div");
    floatingWindow.id = "floating-window";
    floatingWindow.style.maxHeight = maxHeight + "px";

    const closeFunction = () => {
        floatingWindow.style.display = "none";
    }
    var closeBtn = document.createElement("span");
    closeBtn.className = "close-button";
    closeBtn.innerHTML = "<i class='fas fa-times'></i>"; // FontAwesome close button
    closeBtn.onclick = closeFunction;

    var content = `
                <div class="container" id="standardBox">
    <!-- 9-10.RC.1 -->
    <div class="box odd">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_1" id="9_10_RC_1"> </label>
        <div class="content">
            <strong>9-10.RC.1</strong><br>
            <p>Analyze what a text says both explicitly and implicitly (e.g., inferences and interpretations) by citing strong and thorough textual evidence. (E)</p>
        </div>
    </div>
    <!-- 9-10.RC.2 -->
    <div class="box even">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_2" id="9_10_RC_2"> </label>
        <div class="content">
            <strong>9-10.RC.2</strong><br>
            <p>Analyze in detail the development of two or more themes over the course of a work of literature, including how they emerge and are specific and refined by specific details. (E)</p>
        </div>
    </div>
    <!-- 9-10.RC.3 -->
    <div class="box odd">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_3" id="9_10_RC_3"> </label>
        <div class="content">
            <strong>9-10.RC.3</strong><br>
            <p>Analyze and evaluate how an author’s choices concerning how to structure a work of literature, order events within it (e.g., parallel episodes), and manipulate time (e.g., pacing, flashbacks) contribute to the overall meaning and effect of a work.</p>
        </div>
    </div>
    <!-- 9-10.RC.4 -->
    <div class="box even">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_4" id="9_10_RC_4"> </label>
        <div class="content">
            <strong>9-10.RC.4</strong><br>
            <p>Analyze in detail the development of two or more central ideas over the course of a text, including how they build on one another to provide a complex analysis.</p>
        </div>
    </div>
    <!-- 9-10.RC.5 -->
    <div class="box odd">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_5" id="9_10_RC_5"> </label>
        <div class="content">
            <strong>9-10.RC.5</strong><br>
            <p>Analyze a series of ideas or events, including the order in which the points are made and developed, and the connections that are drawn between them.</p>
        </div>
    </div>
    <!-- 9-10.RC.6 -->
    <div class="box even">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_6" id="9_10_RC_6"> </label>
        <div class="content">
            <strong>9-10.RC.6</strong><br>
            <p>Determine an author’s perspective or purpose in a text, and analyze how an author uses rhetoric to advance that perspective or purpose.</p>
        </div>
    </div>
    <!-- 9-10.RC.7 -->
    <div class="box odd">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_7" id="9_10_RC_7"> </label>
        <div class="content">
            <strong>9-10.RC.7</strong><br>
            <p>Delineate and evaluate the argument and specific claims in a text, assessing whether the reasoning is valid and the evidence is relevant and sufficient; identify false statements and fallacious reasoning.</p>
        </div>
    </div>
    <!-- 9-10.RC.8 -->
    <div class="box even">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_8" id="9_10_RC_8"> </label>
        <div class="content">
            <strong>9-10.RC.8</strong><br>
            <p>Analyze U.S. and world documents of historical and literary significance, including how they address related themes and concepts.</p>
        </div>
    </div>
    <!-- 9-10.RC.9 -->
    <div class="box odd">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_9" id="9_10_RC_9"> </label>
        <div class="content">
            <strong>9-10.RC.9</strong><br>
            <p>Use context to determine or clarify the meaning of words and phrases.</p>
        </div>
    </div>
    <!-- 9-10.RC.10 -->
    <div class="box even">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_10" id="9_10_RC_10"> </label>
        <div class="content">
            <strong>9-10.RC.10</strong><br>
            <p>Analyze nuances in the meaning of words with similar denotations.</p>
        </div>
    </div>
    <!-- 9-10.RC.11 -->
    <div class="box odd">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_11" id="9_10_RC_11"> </label>
        <div class="content">
            <strong>9-10.RC.11</strong><br>
            <p>Identify and correctly use patterns of word changes that indicate different meanings or parts of speech (e.g., analyze, analysis, analytical; advocate, advocacy).</p>
        </div>
    </div>
    <!-- 9-10.RC.12 -->
    <div class="box even">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_12" id="9_10_RC_12"> </label>
        <div class="content">
            <strong>9-10.RC.12</strong><br>
            <p>Analyze the meaning of words and phrases as they are used in works of literature, including figurative, connotative, and denotative meanings; analyze the impact of specific word choices on meaning and tone, including words with multiple meanings. (E)</p>
        </div>
    </div>
    <!-- 9-10.RC.13 -->
    <div class="box odd">
        <label class="checkbox"><input type="checkbox" name="9_10_RC_13" id="9_10_RC_13"> </label>
        <div class="content">
            <strong>9-10.RC.13</strong><br>
            <p>Determine the meaning of words and phrases as they are used in a nonfiction text, including figurative, connotative, denotative, and technical meanings; evaluate the effectiveness of specific word choices on meaning and tone in multiple and varied contexts.</p>
        </div>
    </div>
    <!-- 9-10.W.1 -->
    <div class="box even">
        <label class="checkbox"><input type="checkbox" name="9_10_W_1" id="9_10_W_1"> </label>
        <div class="content">
            <strong>9-10.W.1</strong><br>
            <p>Write arguments in a variety of forms that: a. Introduce claim(s), distinguish the claim(s) from alternate or opposing claims, and create an organization that establishes clear relationships among claim(s), counterclaims, reasons, and evidence. b. Use rhetorical strategies to enhance the effectiveness of the claim. c. Develop claim(s) and counterclaims fairly, supplying evidence for each while pointing out the strengths and limitations of both in a manner that anticipates the audience’s knowledge level and concerns. d. Use effective transitions to link the major sections of the text, create cohesion, and clarify the relationships between claim(s) and reasons, between reasons and evidence, and between claim(s) and counterclaims. e. Establish and maintain a consistent style and tone appropriate for the purpose and audience. f. Provide a concluding statement or section that follows from and supports the argument presented. (E)</p>
        </div>
    </div>
    <!-- 9-10.W.2 -->
    <div class="box odd">
        <label class="checkbox"><input type="checkbox" name="9_10_W_2" id="9_10_W_2"> </label>
        <div class="content">
            <strong>9-10.W.2</strong><br>
            <p>Write informative compositions on a variety of topics that: a. Introduce a topic and organize complex ideas, concepts, and information to make important connections and distinctions. b. Develop the topic utilizing credible sources with relevant, and sufficient facts, extended definitions, concrete details, quotations, or other information and examples appropriate to the audience’s knowledge of the topic. c. Use appropriate transitions to link the major sections of the text, create cohesion, and clarify the relationships among complex ideas and concepts. d. Choose language and content-specific vocabulary that express ideas precisely and concisely to manage the complexity of the topic, recognizing and eliminating wordiness and redundancy. e. Establish and maintain a style appropriate for the purpose and audience. f. Provide a concluding statement or section that follows and supports the information or explanation presented (e.g., articulating implications or the significance of the topic). (E)</p>
        </div>
     </div>

<!-- 9-10.W.3 -->
<div class="box even">
    <label class="checkbox"><input type="checkbox" name="9_10_W_3" id="9_10_W_3"> </label>
    <div class="content">
        <strong>9-10.W.3</strong><br>
        <p>Write narrative compositions in a variety of forms that: a. Engage and orient the reader by setting out a problem, situation, or observation, establishing one or multiple point(s) of view, and introducing a narrator and/or characters. b. Create a smooth progression of experiences or events. c. Use narrative techniques, such as dialogue, pacing, description, reflection, and multiple plotlines to develop experiences, events, and/or characters. d. Use a variety of techniques to sequence events so that they build on one another to create a coherent whole. e. Use precise words and phrases, telling details, and sensory language to convey a vivid picture of the experiences, events, setting, and/or characters. f. Provide an ending that follows and reflects on what is experienced, observed, or resolved over the course of the narrative. (E)</p>
    </div>
</div>

<!-- 9-10.W.4 -->
<div class="box odd">
    <label class="checkbox"><input type="checkbox" name="9_10_W_4" id="9_10_W_4"> </label>
    <div class="content">
        <strong>9-10.W.4</strong><br>
        <p>Apply the writing process to all formal writing including but not limited to argumentative, informative, and narrative. a. Plan and develop, draft, and revise writing using appropriate reference materials. Rewrite, try a new approach, focusing on addressing what is most significant for a specific purpose and audience, and edit to produce and strengthen writing that is clear and coherent. b. Use technology to generate, produce, publish, and update individual or shared writing products, taking advantage of technology’s capacity to link to other information and to display information flexibly and dynamically (e.g., use of publishing programs, integration of multimedia). c. Utilize a standard style guide framework for in-text documentation, formatting, and works cited in order to properly credit sources in all writing types, utilizing multiple sources when appropriate.</p>
    </div>
</div>

<!-- 9-10.W.5 -->
<div class="box even">
    <label class="checkbox"><input type="checkbox" name="9_10_W_5" id="9_10_W_5"> </label>
    <div class="content">
        <strong>9-10.W.5</strong><br>
        <p>Conduct more sustained research assignments and tasks to build knowledge about the research process and the topic under study. a. Formulate an inquiry question and refine and narrow the focus as research evolves. b. Gather relevant information from multiple authoritative sources, using advanced searches effectively, and annotate sources. c. Assess the usefulness of each source in answering the research question. d. Synthesize and integrate information into the text selectively to maintain the flow of ideas. e. Avoid plagiarism and over-reliance on any one source and follow a standard format (e.g., MLA, APA) for citation. f. Present information, choosing from a variety of formats. (E)</p>
    </div>
</div>

<!-- 9-10.W.6 -->
<div class="box odd">
    <label class="checkbox"><input type="checkbox" name="9_10_W_6" id="9_10_W_6"> </label>
    <div class="content">
        <strong>9-10.W.6</strong><br>
        <p>Demonstrate command of English grammar and usage, focusing on: a. Verbs – Forming and using verbs in the indicative, imperative, interrogative, conditional, and subjunctive moods. b. Usage – Identifying and using parallelism in all writing to present items in a series and items juxtaposed for emphasis. (E)</p>
    </div>
</div>

<!-- 9-10.W.7 -->
<div class="box even">
    <label class="checkbox"><input type="checkbox" name="9_10_W_7" id="9_10_W_7"> </label>
    <div class="content">
        <strong>9-10.W.7</strong><br>
        <p>Demonstrate command of the conventions of standard English capitalization, punctuation, and spelling focusing on: a. Punctuation – Using a semicolon and a conjunctive adverb to link two or more closely related independent clauses. (E)</p>
    </div>
</div>

<!-- 9-10.CC.1 -->
<div class="box odd">
    <label class="checkbox"><input type="checkbox" name="9_10_CC_1" id="9_10_CC_1"> </label>
    <div class="content">
        <strong>9-10.CC.1</strong><br>
        <p>Initiate and participate effectively in a range of collaborative discussions on grade-appropriate topics, texts, and issues, building on others’ ideas and expressing personal ideas clearly and persuasively. (E)</p>
    </div>
</div>

<!-- 9-10.CC.2 -->
<div class="box even">
    <label class="checkbox"><input type="checkbox" name="9_10_CC_2" id="9_10_CC_2"> </label>
    <div class="content">
        <strong>9-10.CC.2</strong><br>
        <p>Examine, analyze, and reflect on ideas under discussion by providing textual evidence to support or refute those ideas. (E)</p>
    </div>
</div>

<!-- 9-10.CC.3 -->
<div class="box odd">
    <label class="checkbox"><input type="checkbox" name="9_10_CC_3" id="9_10_CC_3"> </label>
    <div class="content">
        <strong>9-10.CC.3</strong><br>
        <p>Expand conversations by posing and responding to questions that relate the current discussion to broader themes or larger ideas; actively incorporate others into the discussion; and clarify, verify, or challenge ideas and conclusions.</p>
    </div>
</div>

<!-- 9-10.CC.4 -->
<div class="box even">
    <label class="checkbox"><input type="checkbox" name="9_10_CC_4" id="9_10_CC_4"> </label>
    <div class="content">
        <strong>9-10.CC.4</strong><br>
        <p>Respond thoughtfully to multiple perspectives, summarize points of agreement and disagreement, and, when warranted, qualify or justify personal views and understanding and make new connections in reference to the evidence and reasoning presented.</p>
    </div>
</div>

<!-- 9-10.CC.5 -->
<div class="box odd">
    <label class="checkbox"><input type="checkbox" name="9_10_CC_5" id="9_10_CC_5"> </label>
    <div class="content">
        <strong>9-10.CC.5</strong><br>
        <p>Analyze multiple sources of information presented in diverse media and formats while evaluating the credibility and accuracy of each source.</p>
    </div>
</div>

<!-- 9-10.CC.6 -->
<div class="box even">
    <label class="checkbox"><input type="checkbox" name="9_10_CC_6" id="9_10_CC_6"> </label>
    <div class="content">
        <strong>9-10.CC.6</strong><br>
        <p>Evaluate a speaker’s perspective, reasoning, and use of evidence and rhetoric, identifying any fallacious reasoning or distorted evidence.</p>
    </div>
</div>

<!-- 9-10.CC.7 -->
<div class="box odd">
    <label class="checkbox"><input type="checkbox" name="9_10_CC_7" id="9_10_CC_7"> </label>
    <div class="content">
        <strong>9-10.CC.7</strong><br>
        <p>Present information, findings, and supporting evidence logically so that listeners can follow the line of reasoning, ensuring organization and development are appropriate to purpose, audience, and task.</p>
    </div>
</div>

<!-- 9-10.CC.8 -->
<div class="box even">
    <label class="checkbox"><input type="checkbox" name="9_10_CC_8" id="9_10_CC_8"> </label>
    <div class="content">
        <strong>9-10.CC.8</strong><br>
        <p>Analyze bias in media through the inclusion or exclusion of information and reliability of the source from visual and verbal messages to achieve a desired result. (E)</p>
    </div>
</div>


                </div>
<div style="margin-top: 20px;">
        <button class="apply-button" id="apply-button">Apply</button>
        <button class="cancel-button" id="cancel-button" >Cancel</button>
    </div>
            `;

    if (!checkStandardsOpen()) {
        floatingWindow.innerHTML = content;
        floatingWindow.appendChild(closeBtn);
        document.body.appendChild(floatingWindow);
        console.log('open standards');
        document.getElementById("apply-button").onclick = function (){
			upload();
			closeFunction();
		}
        document.getElementById("cancel-button").onclick = closeFunction;
    }


}
