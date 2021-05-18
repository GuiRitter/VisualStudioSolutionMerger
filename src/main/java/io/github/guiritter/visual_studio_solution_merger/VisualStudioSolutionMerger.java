package io.github.guiritter.visual_studio_solution_merger;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

public class VisualStudioSolutionMerger {

	private static JTextArea sourceArea;
	private static JTextArea targetArea;
	private static JTextArea resultArea;

	public static final int INVALID_INDEX = -1;

	static {
		JFrame.setDefaultLookAndFeelDecorated(true);
		JDialog.setDefaultLookAndFeelDecorated(true);
	}

	private static final List<Project> parse(String text) {
		var array = text.split("\n");
		int length = array.length;
		int i;
		String line0 = null;
		String line1 = null;
		String line2 = null;
		String line3 = null;
		int modulo;
		var list = new LinkedList<Project>();
		String line;
		for (i = 0; i < length; i++) {
			modulo = i % 4;
			line = array[i].split(" = ")[1];
			switch (modulo) {
				case 0 -> { line0 = line; }
				case 1 -> { line1 = line; }
				case 2 -> { line2 = line; }
				case 3 -> { line3 = line; list.add(new Project(line0, line1, line2, line3)); }
			}
		}
		return list;
	}

	private static final void recalculateIndex(List<Project> projectList) {
		int i;
		for (i = 0; i < projectList.size(); i++) {
			projectList.get(i).index = i + 1;
		}
	}

	private static final void merge(ActionEvent event) {

		var sourceList = VisualStudioSolutionMerger.parse(sourceArea.getText());
		var targetList = VisualStudioSolutionMerger.parse(targetArea.getText());

		int thisI;
		int otherI;

		Project thisProject = null;
		Project otherProject = null;

		List<Project> thisList = sourceList;
		List<Project> otherList = targetList;
		List<Project> tempList;

		int otherFound;

		// boolean thisDone = false;
		boolean otherDone = false;

		for (thisI = 0; thisI < thisList.size(); thisI++) {

			thisProject = thisList.get(thisI);

			otherFound = INVALID_INDEX;

			for (otherI = 0; otherI < otherList.size(); otherI++) {

				otherProject = otherList.get(otherI);

				if (Objects.equals(thisProject, otherProject)) {
					
					otherFound = otherI;
					break;
				}
			}

			if (otherFound > INVALID_INDEX) {

				if (otherFound == thisI) {
					if ((thisI + 1) == thisList.size()) {
						// thisDone = true;
						if (otherDone) {
							break;
						} else {
							// thisDone = false;
							otherDone = true;
							tempList = thisList;
							thisList = otherList;
							otherList = tempList;
							thisI = INVALID_INDEX;
							continue;
						}
					}
					continue;
				} else {
					otherList.remove(otherFound);
					otherList.add(thisI, otherProject);
					thisI = INVALID_INDEX;
					continue;
				}
			} else {
				otherList.add(thisI, new Project(thisProject));
				// thisDone = false;
				otherDone = false;
				tempList = thisList;
				thisList = otherList;
				otherList = tempList;
				thisI = INVALID_INDEX;
				continue;
			}
		}

		VisualStudioSolutionMerger.recalculateIndex(sourceList);

		var resultBuilder = new StringBuilder();

		for (thisI = 0; thisI < sourceList.size(); thisI++) {

			resultBuilder.append(sourceList.get(thisI)).append("\n");
		}

		resultArea.setText(resultBuilder.toString());
	}

	public static void main(String args[]) {
		JFrame frame = new JFrame("Hour Minute Formatter");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		JScrollPane sourcePane = new JScrollPane();
		frame.add(sourcePane, BorderLayout.LINE_START);

		sourceArea = new JTextArea();
		sourcePane.setViewportView(sourceArea);
		sourceArea.setRows(10);
		sourceArea.setColumns(25);

		JScrollPane resultPane = new JScrollPane();
		frame.add(resultPane, BorderLayout.CENTER);

		resultArea = new JTextArea();
		resultPane.setViewportView(resultArea);
		resultArea.setRows(10);
		resultArea.setColumns(25);

		JScrollPane targetPane = new JScrollPane();
		frame.add(targetPane, BorderLayout.LINE_END);

		targetArea = new JTextArea();
		targetPane.setViewportView(targetArea);
		targetArea.setRows(10);
		targetArea.setColumns(25);

		JButton button = new JButton("format");
		frame.add(button, BorderLayout.PAGE_END);
		button.addActionListener(VisualStudioSolutionMerger::merge);

		frame.setVisible(true);
		frame.pack();
		frame.setLocationRelativeTo(null);
	}
}
