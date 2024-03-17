import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  fontSize,
  fontWeights,
  minBreakpointQuery,
  sectionMargins,
  visuallyHidden,
} from '../styles';
import { Button, Container, HtmlContent } from './ui';
import { slugify } from '../utils';
import ChecklistStatistics from './ChecklistStatistics';

const StyledChecklist = styled.section`
  ${sectionMargins()};
`;

const StyledItem = styled.div`
  padding: 20px 30px;

  ${minBreakpointQuery.small`
    padding: 25px 40px;
  `}

  ${minBreakpointQuery.large`
    padding: 30px 50px;
  `}
`;

const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckboxLabel = styled.label``;

const StyledCheckbox = styled.input`
  margin: 0;
  height: 14px;
  width: 14px;
  flex-shrink: 0;
`;

const StyledCheckboxCategoryText = styled.span`
  position: relative;
  display: block;
  padding-left: 14px;
  ${fontSize(22)};
  font-weight: ${fontWeights.bold};
`;

const StyledCheckboxLabelText = styled.span`
  ${visuallyHidden()};
`;

const StyledCheckboxSubcategoryText = styled.span`
  position: relative;
  display: block;
  padding-left: 14px;
  ${fontSize(18)};
  font-weight: ${fontWeights.bold};
`;

const StyledCheckboxItemText = styled.span`
  position: relative;
  display: block;
  padding-left: 14px;
  ${fontSize(16)};
  font-weight: ${fontWeights.bold};
`;

const StyledContentWrapper = styled.div`
  ${({ $display }) => {
    if (!$display) {
      return css`
        ${visuallyHidden()};
      `;
    }
  }}
`;

const StyledContent = styled(HtmlContent)`
  margin: 30px 0;
`;

const Checklist = ({ checkboxOptions }) => {
  const [parentChecked, setParentChecked] = useState(
    new Array(checkboxOptions.length).fill(false),
  );
  const [childChecked, setChildChecked] = useState(
    checkboxOptions.map(parent =>
      new Array(parent.treeChildren.length).fill(false),
    ),
  );
  const [subChildChecked, setSubChildChecked] = useState(
    checkboxOptions.map(parent =>
      parent.treeChildren.map(child =>
        child.treeChildren && child.treeChildren.length > 0
          ? new Array(child.treeChildren.length).fill(false)
          : [],
      ),
    ),
  );

  const handleParentCheckboxChange = parentIndex => {
    const updatedParentChecked = [...parentChecked];
    updatedParentChecked[parentIndex] = !updatedParentChecked[parentIndex];
    setParentChecked(updatedParentChecked);

    const updatedChildChecked = [...childChecked];
    updatedChildChecked[parentIndex] = updatedParentChecked[parentIndex]
      ? new Array(checkboxOptions[parentIndex].treeChildren.length).fill(true)
      : new Array(checkboxOptions[parentIndex].treeChildren.length).fill(false);
    setChildChecked(updatedChildChecked);

    const updatedSubChildChecked = [...subChildChecked];
    updatedSubChildChecked[parentIndex] = updatedParentChecked[parentIndex]
      ? checkboxOptions[parentIndex].treeChildren.map(child =>
          child.treeChildren && child.treeChildren.length > 0
            ? new Array(child.treeChildren.length).fill(true)
            : [],
        )
      : checkboxOptions[parentIndex].treeChildren.map(child =>
          child.treeChildren && child.treeChildren.length > 0
            ? new Array(child.treeChildren.length).fill(false)
            : [],
        );
    setSubChildChecked(updatedSubChildChecked);
  };

  const handleChildCheckboxChange = (parentIndex, childIndex) => {
    const updatedChildChecked = [...childChecked];
    updatedChildChecked[parentIndex][childIndex] =
      !updatedChildChecked[parentIndex][childIndex];
    setChildChecked(updatedChildChecked);

    const allChildChecked = updatedChildChecked[parentIndex].every(
      isChecked => isChecked,
    );
    const updatedParentChecked = [...parentChecked];
    updatedParentChecked[parentIndex] = allChildChecked;
    setParentChecked(updatedParentChecked);

    const updatedSubChildChecked = [...subChildChecked];
    updatedSubChildChecked[parentIndex][childIndex] =
      updatedChildChecked[parentIndex][childIndex];
    setSubChildChecked(updatedSubChildChecked);

    if (updatedChildChecked[parentIndex][childIndex]) {
      const updatedSubChildChecked = [...subChildChecked];
      updatedSubChildChecked[parentIndex][childIndex] =
        checkboxOptions[parentIndex].treeChildren[childIndex].treeChildren &&
        checkboxOptions[parentIndex].treeChildren[childIndex].treeChildren
          .length > 0
          ? checkboxOptions[parentIndex].treeChildren[
              childIndex
            ].treeChildren.map(() => true)
          : [];
      setSubChildChecked(updatedSubChildChecked);
    } else {
      const updatedSubChildChecked = [...subChildChecked];
      updatedSubChildChecked[parentIndex][childIndex] =
        checkboxOptions[parentIndex].treeChildren[childIndex].treeChildren &&
        checkboxOptions[parentIndex].treeChildren[childIndex].treeChildren
          .length > 0
          ? checkboxOptions[parentIndex].treeChildren[
              childIndex
            ].treeChildren.map(() => false)
          : [];
      setSubChildChecked(updatedSubChildChecked);
    }
  };

  const handleSubChildCheckboxChange = (
    parentIndex,
    childIndex,
    subChildIndex,
  ) => {
    const updatedSubChildChecked = [...subChildChecked];
    updatedSubChildChecked[parentIndex][childIndex][subChildIndex] =
      !updatedSubChildChecked[parentIndex][childIndex][subChildIndex];
    setSubChildChecked(updatedSubChildChecked);

    const allSubChildChecked = updatedSubChildChecked[parentIndex][
      childIndex
    ].every(isChecked => isChecked);
    const updatedChildChecked = [...childChecked];
    updatedChildChecked[parentIndex][childIndex] = allSubChildChecked;
    setChildChecked(updatedChildChecked);

    const allChildChecked = updatedChildChecked[parentIndex].every(
      isChecked => isChecked,
    );
    const updatedParentChecked = [...parentChecked];
    updatedParentChecked[parentIndex] = allChildChecked;
    setParentChecked(updatedParentChecked);
  };

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubcategory, setActiveSubcategory] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [parentPercentages, setParentPercentages] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();

    const data = [];

    // Loop through each parent
    checkboxOptions.forEach((parent, parentIndex) => {
      let totalSubChildCount = 0;
      let checkedSubChildCount = 0;

      // Loop through each child of the parent
      parent.treeChildren.forEach((child, childIndex) => {
        // Increment the total subChild count
        totalSubChildCount += child.treeChildren.length;

        // Loop through each subChild of the child
        child.treeChildren.forEach((subChild, subChildIndex) => {
          // If the subChild is checked, increment the checked count
          if (subChildChecked[parentIndex][childIndex][subChildIndex]) {
            checkedSubChildCount++;
          }
        });
      });

      // Calculate the percentage completed
      const percentageCompleted =
        totalSubChildCount > 0
          ? (checkedSubChildCount / totalSubChildCount) * 100
          : 0;

      data.push({
        caption: parent.title,
        statistic: parseFloat(percentageCompleted.toFixed(2)), // Parse the result as a float
      });
    });

    setParentPercentages(data);
  };

  return (
    <StyledChecklist>
      <Container>
        <form
          id="checklist-form"
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          {parentPercentages && (
            <ChecklistStatistics items={parentPercentages} />
          )}
          <Button>Reset</Button>
          <Button>Save</Button>
          {checkboxOptions.map((parent, parentIndex) => {
            const display = activeCategory === parentIndex;
            return (
              <StyledItem key={parentIndex}>
                <StyledCheckboxWrapper>
                  <StyledCheckboxLabel>
                    <StyledCheckbox
                      name={slugify(parent.title)}
                      type="checkbox"
                      checked={parentChecked[parentIndex]}
                      onChange={() => handleParentCheckboxChange(parentIndex)}
                    />
                    <StyledCheckboxLabelText>
                      {parent.title}
                    </StyledCheckboxLabelText>
                  </StyledCheckboxLabel>
                  <StyledCheckboxCategoryText
                    onClick={() =>
                      setActiveCategory(display ? undefined : parentIndex)
                    }
                  >
                    {parent.title}
                  </StyledCheckboxCategoryText>
                </StyledCheckboxWrapper>
                <StyledContentWrapper $display={display}>
                  <StyledContent content={parent.content} />
                  {parent.treeChildren.map((child, childIndex) => {
                    const display = activeSubcategory === childIndex;
                    return (
                      <div key={childIndex}>
                        <StyledCheckboxWrapper>
                          <StyledCheckboxLabel>
                            <StyledCheckbox
                              name={slugify(child.title)}
                              type="checkbox"
                              checked={childChecked[parentIndex][childIndex]}
                              onChange={() =>
                                handleChildCheckboxChange(
                                  parentIndex,
                                  childIndex,
                                )
                              }
                            />
                          </StyledCheckboxLabel>
                          <StyledCheckboxSubcategoryText
                            onClick={() =>
                              setActiveSubcategory(
                                display ? undefined : childIndex,
                              )
                            }
                          >
                            {child.title}
                          </StyledCheckboxSubcategoryText>
                        </StyledCheckboxWrapper>
                        <StyledContentWrapper $display={display}>
                          <StyledContent content={child.content} />
                          {child.treeChildren &&
                            child.treeChildren.length > 0 &&
                            child.treeChildren.map(
                              (subChild, subChildIndex) => {
                                const display = activeItem === subChildIndex;
                                return (
                                  <div key={subChildIndex}>
                                    <StyledCheckboxWrapper>
                                      <StyledCheckboxLabel>
                                        <StyledCheckbox
                                          type="checkbox"
                                          checked={
                                            subChildChecked[parentIndex][
                                              childIndex
                                            ][subChildIndex]
                                          }
                                          onChange={() =>
                                            handleSubChildCheckboxChange(
                                              parentIndex,
                                              childIndex,
                                              subChildIndex,
                                            )
                                          }
                                        />
                                      </StyledCheckboxLabel>
                                      <StyledCheckboxItemText
                                        onClick={() =>
                                          setActiveItem(
                                            display ? undefined : subChildIndex,
                                          )
                                        }
                                      >
                                        {subChild.title} ({subChild.level})
                                      </StyledCheckboxItemText>
                                    </StyledCheckboxWrapper>
                                    <StyledContentWrapper $display={display}>
                                      <StyledContent
                                        content={subChild.content}
                                      />
                                    </StyledContentWrapper>
                                  </div>
                                );
                              },
                            )}
                        </StyledContentWrapper>
                      </div>
                    );
                  })}
                </StyledContentWrapper>
              </StyledItem>
            );
          })}
        </form>
      </Container>
    </StyledChecklist>
  );
};

export default Checklist;
