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

		int sourceI;
		int targetI;

		Project sourceProject = null;
		Project targetProject = null;

		int targetFound;

		for (sourceI = 0; sourceI < sourceList.size(); sourceI++) {

			sourceProject = sourceList.get(sourceI);

			targetFound = INVALID_INDEX;

			for (targetI = 0; targetI < targetList.size(); targetI++) {

				targetProject = targetList.get(targetI);

				if (Objects.equals(sourceProject, targetProject)) {
					
					targetFound = targetI;
					break;
				}
			}

			if (targetFound > INVALID_INDEX) {

				if (targetFound == sourceI) {
					continue;
				} else {
					targetList.remove(targetFound);
					targetList.add(sourceI, targetProject);
					sourceI = -1;
					continue;
				}
			}
		}

		VisualStudioSolutionMerger.recalculateIndex(sourceList);

		var resultBuilder = new StringBuilder();

		for (sourceI = 0; sourceI < sourceList.size(); sourceI++) {

			resultBuilder.append(sourceList.get(sourceI)).append("\n");
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
