# Introduction
We currenty have three different types of components:
Component Type | CSS | SCSS | CSS-IN-JSS
-------------- | --- | ---- | ----------
**layout components** | YES | +++ | +
**private components** | YES | - | +++
**presentational component** | NO* | - | + (some exceptions allowed)
**container components**: | NO | - | -

```
src/
  components/
    layout/
      Block/
        index.tsx <--- layout component
      Page/
        index.tsx <--- layout component
      Grid/
        index.tsx <--- layout component
  routes/
    signup/
      components/
        SignupForm/
          index.tsx <--- Private component
        Layout.tsx <--- Presentational component
      container/
        index.tsx <--- Container component
```
## layout components [SCSS]
This are low level components which are directly tied to HTML representation. They should just a wrapper of mui's components, or enhanced HTML.
They contain complex css if needed via .scss files (including mixins). 

They **implement & use** semantic definitions: xs, sm, md, lg, xl for positioning (margin, paddings), fonts, and in general, whichever property introduced by the theme, primary, secondary color, for example. They allow to build presentational components using semantic approach and not css at all. 

## private components [JSS-IN-CSS]
When a presentational component is too complex, it should be splitted in smaller components known as "Private components", those components should be placed inside the view's route where their presentational component is.

They have their CSS definitions written in [CSS-IN-JSS](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660), we will follow the material-ui's approach, using WithStyles. See:
```
const styles = createStyles({
  container: {
    fontSize: fontXs,
  },
  root: {
    paddingTop: lg,
    color: primary,
  },
});

interface Props extends WithStyles<typeof styles> {
  ...
}

class TextFieldElem extends React.Component<Props> {
  public render(): JSX.Element {
    const { classes, ... } = this.props;
    
    return (
      <React.Fragment>
        <Block className={classes.container}>
          ...
        </Block>
        <MuiTextField className={classes.root}>
          ...
        </MuiTextField>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TextFieldElem);
```

## presentational component
Those components belongs to only one route, describing the ui in a semantic approach without using any CSS
```
const Layout => ({...}) => (
  <Grid>
    <GridItem variant="col" xs={12} md={6}>
      <Block maxWidth=400>
        <Typography inline>Hello</Typography>
        <Typography inline>World</Typography>
      </Block>
      <Block margin="xl" padding="xxl">
        ....
      </Block>
    </GridItem>
    <GridItem>
      <Form>
        ...
      </Form>
    </GridItem>
  <Grid>
)
```

## container components
Those components do not have CSS as well, but also do not have any UI definition, just the logic of the route.
Those components also contain the callbacks and domain functions of the route which are passed down of the tree via props.

# Semantic approach
We describe the presentational component using semantic approach with predefined constants specfied in a separate file and directly connected with our theme provider.
In that way we can customize our layout components in the theme description, using them without maintaining by ourselves.