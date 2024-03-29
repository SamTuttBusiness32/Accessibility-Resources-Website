import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  brandColours,
  fontWeights,
  maxBreakpointQuery,
  minBreakpointQuery,
  sectionMargins,
  standardColours,
  standardTransition,
  visuallyHidden,
} from '../styles';
import { Button, Container, FontWeight, Heading, TextAlignment } from './ui';
import { slugify } from '../utils';
import ChecklistStatistics from './ChecklistStatistics';
import Content from './Content';

const StyledChecklist = styled.section`
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
`;

const StyledButtonWrapper = styled.div`
  background-color: ${brandColours.primary};
  padding: 15px 0;
`;

const StyledButtonInner = styled.div`
  display: flex;
  gap: 15px;

  ${maxBreakpointQuery.small`
    flex-direction: column;
  `}
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: ${standardColours.white};
  color: ${brandColours.primary};
  border: solid 2px ${brandColours.tertiary};
  border-radius: 4px;

  &:hover {
    color: ${standardColours.white};
  }
`;

const StyledInner = styled.div`
  ${sectionMargins(`30px`, `60px`)};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 30px;

  ${minBreakpointQuery.large`
    margin-bottom: 45px;
  `}
`;

const StyledOutter = styled.div`
  background-color: ${brandColours.primary};
  padding: 15px 0;
`;

const StyledTabWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const StyledItem = styled.div`
  padding: 12px 20px;
  max-width: 400px;
  background-color: ${standardColours.white};
  color: ${brandColours.primary};
  display: flex;
  align-items: center;
  border: solid 2px ${brandColours.tertiary};
  border-radius: 4px;

  transition: ${({ theme }) =>
    `${standardTransition(
      'color',
      theme.animationDelayValue,
    )},  ${standardTransition('background-color', theme.animationDelayValue)}`};

  &:hover {
    color: ${standardColours.white};
    background-color: ${brandColours.tertiary};
  }

  ${({ $active }) => {
    if ($active) {
      return css`
        color: ${standardColours.white};
        background-color: ${brandColours.tertiary};
      `;
    }
  }}
`;

const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckboxLabel = styled.label`
  height: 16px;
  width: 16px;
  display: flex;
`;

const StyledCheckbox = styled.input`
  margin: 0;
  height: 16px;
  width: 16px;
  flex-shrink: 0;
  accent-color: ${brandColours.primary};
`;

const StyledItemText = styled.span`
  position: relative;
  display: block;
  padding-left: 14px;
  font-weight: ${({ theme }) =>
    FontWeight(theme.fontWeightValue, fontWeights.bold)};
`;

const StyledCheckboxLabelText = styled.span`
  ${visuallyHidden()};
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

const StyledContent = styled(Content)``;

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

  useEffect(() => {
    const parentCheckedState = localStorage.getItem('parentChecked');
    const childCheckedState = localStorage.getItem('childChecked');
    const subChildCheckedState = localStorage.getItem('subChildChecked');
    const parentPercentagesState = localStorage.getItem('parentPercentages');

    if (parentCheckedState) setParentChecked(JSON.parse(parentCheckedState));
    if (childCheckedState) setChildChecked(JSON.parse(childCheckedState));
    if (subChildCheckedState)
      setSubChildChecked(JSON.parse(subChildCheckedState));
    if (parentPercentagesState) {
      setParentPercentages(JSON.parse(parentPercentagesState));
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('parentChecked', JSON.stringify(parentChecked));
    localStorage.setItem('childChecked', JSON.stringify(childChecked));
    localStorage.setItem('subChildChecked', JSON.stringify(subChildChecked));
    localStorage.setItem(
      'parentPercentages',
      JSON.stringify(parentPercentages),
    );
  }, [
    parentChecked,
    childChecked,
    subChildChecked,
    activeCategory,
    activeSubcategory,
    activeItem,
    parentPercentages,
  ]);

  const handleReset = () => {
    setParentChecked(new Array(checkboxOptions.length).fill(false));
    setChildChecked(
      checkboxOptions.map(parent =>
        new Array(parent.treeChildren.length).fill(false),
      ),
    );
    setSubChildChecked(
      checkboxOptions.map(parent =>
        parent.treeChildren.map(child =>
          child.treeChildren && child.treeChildren.length > 0
            ? new Array(child.treeChildren.length).fill(false)
            : [],
        ),
      ),
    );
  };

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
      <ChecklistStatistics
        items={parentPercentages}
        parentPercentages={parentPercentages}
      />
      <form
        id="checklist-form"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <StyledButtonWrapper>
          <Container>
            <StyledButtonInner>
              <StyledButton onClick={handleReset}>Reset</StyledButton>
              <StyledButton>Save</StyledButton>
            </StyledButtonInner>
          </Container>
        </StyledButtonWrapper>
        <StyledInner>
          <StyledHeading>Checklist</StyledHeading>
          <StyledOutter>
            <Container>
              <StyledTabWrapper>
                {checkboxOptions.map((parent, parentIndex) => (
                  <StyledItem
                    key={parentIndex}
                    $active={parentIndex === activeCategory}
                    onClick={() => setActiveCategory(parentIndex)}
                  >
                    <StyledCheckboxWrapper>
                      <StyledCheckboxLabel>
                        <StyledCheckbox
                          name={slugify(parent.title)}
                          type="checkbox"
                          checked={parentChecked[parentIndex]}
                          onChange={() =>
                            handleParentCheckboxChange(parentIndex)
                          }
                        />
                        <StyledCheckboxLabelText>
                          {parent.title}
                        </StyledCheckboxLabelText>
                      </StyledCheckboxLabel>
                      <StyledItemText>{parent.title}</StyledItemText>
                    </StyledCheckboxWrapper>
                  </StyledItem>
                ))}
              </StyledTabWrapper>
            </Container>
          </StyledOutter>
          {checkboxOptions.map((parent, parentIndex) => (
            <StyledContentWrapper
              key={parentIndex}
              $display={parentIndex === activeCategory}
            >
              <StyledContent content={parent.content} />
              <StyledOutter>
                <Container>
                  <StyledTabWrapper>
                    {parent.treeChildren.map((child, childIndex) => (
                      <StyledItem
                        key={childIndex}
                        $active={childIndex === activeSubcategory}
                        onClick={() => setActiveSubcategory(childIndex)}
                      >
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
                          <StyledItemText>{child.title}</StyledItemText>
                        </StyledCheckboxWrapper>
                      </StyledItem>
                    ))}
                  </StyledTabWrapper>
                </Container>
              </StyledOutter>
              {parent.treeChildren.map((child, childIndex) => (
                <StyledContentWrapper
                  key={childIndex}
                  $display={childIndex === activeSubcategory}
                >
                  <StyledContent content={child.content} />
                  <StyledOutter>
                    <Container>
                      <StyledTabWrapper>
                        {child.treeChildren &&
                          child.treeChildren.length > 0 &&
                          child.treeChildren.map((subChild, subChildIndex) => (
                            <StyledItem
                              key={subChildIndex}
                              $active={subChildIndex === activeItem}
                              onClick={() => setActiveItem(subChildIndex)}
                            >
                              <StyledCheckboxWrapper>
                                <StyledCheckboxLabel>
                                  <StyledCheckbox
                                    type="checkbox"
                                    checked={
                                      subChildChecked[parentIndex][childIndex][
                                        subChildIndex
                                      ]
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
                                <StyledItemText>
                                  {subChild.title} ({subChild.level})
                                </StyledItemText>
                              </StyledCheckboxWrapper>
                            </StyledItem>
                          ))}
                      </StyledTabWrapper>
                    </Container>
                  </StyledOutter>
                  {child.treeChildren &&
                    child.treeChildren.length > 0 &&
                    child.treeChildren.map((subChild, subChildIndex) => (
                      <StyledContentWrapper
                        key={subChildIndex}
                        $display={subChildIndex === activeItem}
                      >
                        <StyledContent content={subChild.content} />
                      </StyledContentWrapper>
                    ))}
                </StyledContentWrapper>
              ))}
            </StyledContentWrapper>
          ))}
        </StyledInner>
      </form>
    </StyledChecklist>
  );
};

export default Checklist;
