---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
inputDocuments:
  - _bmad-output/prd.md
  - _bmad-output/analysis/product-brief-fidelity-ira-modeling-2025-12-22.md
workflowType: 'ux-design'
lastStep: 13
project_name: 'fidelity-ira-modeling'
user_name: 'Paul'
date: '2025-12-23'
---

# UX Design Specification fidelity-ira-modeling

**Author:** Paul
**Date:** 2025-12-23

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

The Portfolio Scenario Modeler is a web-based application designed for sophisticated retail investors who need robust quantitative decision support for managing their retirement accounts. The core vision is to empower these users by providing an accessible, privacy-first tool to stress-test portfolio allocations against various economic scenarios, quantify risk, compare rebalancing options with clear trade-offs, and generate precise, executable trade instructions. It aims to build user confidence and control through data-driven insights, bridging the gap between overly simplistic portfolio trackers and complex institutional tools.

### Target Users

The primary user is "DIY Dan," a 45-year-old, tech-savvy software engineer who diligently manages his own retirement savings. He is motivated to make smart, evidence-based decisions but experiences anxiety during market volatility due to the limitations of his current tools (e.g., spreadsheets). His goal is to feel confident and in control of his portfolio by proactively managing risk and understanding the impact of his decisions.

### Key Design Challenges (Enhanced)

- **Simplifying Complexity:** The primary challenge is to translate sophisticated financial analysis into an intuitive interface. We must prioritize clarity over density, using **progressive disclosure** to show high-level results first, with clear paths for users to drill into details if they choose.
- **Building Trust through Radical Transparency:** For users to trust the tool with their life savings, the design must be transparent. This is more than a principle; it's a feature.
  - **Visualize Uncertainty:** Charts should not only show outcomes but also visually represent the confidence level or range of possibilities.
  - **Source and Freshness:** The UI must always display the source of its market data and exactly when it was last updated.

### Design Opportunities

- **The "Action Bridge":** The journey from analysis to a clear, actionable trade list is a huge opportunity. A seamless and satisfying experience here could be the most valuable part of the product.
- **Visual Comparison:** We have a great opportunity to use strong data visualization to make the side-by-side comparison of portfolios powerful and easy to understand.

## Core User Experience

### 2.1 Defining Experience

The defining experience of the Portfolio Scenario Modeler is to empower a user to: **"Understand your current portfolio, the likely economic future, and how to adapt."** This is the core value proposition that should be evident in every aspect of the design.

### 2.2 User Mental Model

Users currently exist in a state of conflict: they love the **control** offered by tools like Excel and the **analysis** found on financial blogs, but they hate the **manual data entry** and **impersonal nature** of those solutions. Their current workaround is to rely on anecdotal advice from friends and pundits, which they know is suboptimal. Our app must resolve this core conflict by providing personalized, data-driven control without the drudgery.

### 2.3 Success Criteria (Enhanced)

- **"Magic" Import:** The initial CSV import must be an automated moment of delight, instantly organizing messy data into a clear, visualized dashboard.
- **Contextual Intelligence:** The interface must anticipate the user's next question, providing actionable next steps (e.g., "Model Solutions") in response to insights (e.g., "High Risk Warning").
- **Responsive, On-Demand Calculations:** The core experience must feel responsive. When a user adjusts their portfolio, they can press a "Recalculate" button to see the updated results in under a second, avoiding the need for instant "live" updates in the MVP.
- **The "Before & After" Competence:** Users must feel smart and in control by easily comparing their current vs. proposed portfolios and seeing a tangible, quantified improvement (e.g., "Proposed Plan saves $15,000").
- **Transparent Accomplishment:** The experience culminates in the generation of a concrete, **dynamic in-app Action Plan**, bridging the gap between analysis and real-world action.

### 2.4 Novel UX Patterns

Our approach is to **combine familiar UX patterns in innovative ways**. We will leverage established patterns like dashboards and what-if analysis but elevate them with intelligent and proactive features:

- **Intelligent Parsing:** The "Magic" CSV import turns a point of friction into a moment of delight.
- **Proactive Guidance:** The system anticipates user needs, offering "Model Solutions" or suggesting relevant scenarios.
- **Dynamic Feedback:** Real-time "Visual Risk Guardrails" and qualitative "Survival Badges" provide instant, understandable feedback on complex data.
- **Automated Guardian Features:** The app proactively calculates and displays critical information like tax penalties, protecting the user from costly mistakes.

### 2.5 Experience Mechanics (Enhanced)

- **1. Initiation:** The user is invited to begin by a high-signal **"Risk Alert"** on their dashboard or a prominent **"Run Stress Test"** button.
- **2. Interaction:** In a split-screen view, the user selects a scenario and uses fluid **sliders** to adjust their proposed allocation. When ready, they press a **"Recalculate" button** to see the updated charts.
- **3. Feedback:** Success is communicated via dynamic **"Survival Badges"**, color-coded risk indicators (red/amber/green), and an explicit **"Delta" calculation** showing the financial impact of their changes. Errors are handled with helpful, inline tooltips.
- **4. Completion:** The loop concludes when the user is satisfied and clicks the **"Generate Action Plan"** button. This produces a **dynamic, in-app checklist** of buy/sell orders. The final call to action is to execute these trades and mark them as complete within the app.

## Desired Emotional Response

### Primary Emotional Goals

The primary emotional goal for the user is to feel **Empowered and In Control**. This core feeling should permeate every aspect of the experience, from understanding complex scenarios to executing a clear action plan. Secondary goals include feeling **Confident**, **Efficient**, **Productive**, and a sense of **Relief** from the anxiety that comes with financial uncertainty. The product should also create moments of **Delight** through proactive and intelligent assistance.

### Emotional Journey Mapping

- **Discovery:** Users should feel **Surprised and Delighted** by a new, powerful tool, sparking their **Curiosity**.
- **Core Experience:** During the main loop of modeling and comparing, the user should feel **Empowered, Focused, and In Control**.
- **Task Completion:** After generating an action plan, the user should feel **Delighted and Relieved**.
- **Error Handling:** If something goes wrong, the design should guide the user toward feeling **Empowered and In Control** by providing clear information to correct the error, avoiding frustration.
- **Return Use:** Returning users should feel **Efficient and Productive**, knowing they have a powerful tool at their disposal.

### Micro-Emotions

The most critical emotional spectrum to manage is **Confidence vs. Confusion**. The design must relentlessly prioritize choices that build user confidence and eliminate sources of confusion. Every interaction should be a building block for trust and clarity.

### Design Implications

To achieve the desired emotional state, the design will incorporate the following:

- To foster empowerment, the app will display a curated list of appropriate investment vehicles for specific scenarios, with understandable descriptions.
- To avoid confusion, the app will ensure all models are explainable, all available financial products are clear, and a history of simulation results is available for easy comparison.
- Moments of delight will be created by proactively suggesting relevant economic scenarios to model and financial products based on the user's goals.
- Trust and confidence will be built by providing well-researched likelihoods for economic scenarios, historical performance metrics for all financial products, and common financial charts for research.

### Emotional Design Principles

- **1. Design for Empowerment:** Every feature should aim to make the user feel more in control and capable of making their own financial decisions.
- **2. Build Trust Through Transparency:** Proactively build confidence and combat skepticism by being transparent with data sources, calculations, and assumptions.
- **3. Engineer for Delight and Relief:** Go beyond mere functionality. Create moments of delight through proactive suggestions and ensure the end-state of a session is a feeling of relief from anxiety.
- **4. Guide, Don't Just Present:** Don't just show data; guide the user toward understanding. Provide context, explanations, and actionable next steps to prevent confusion and frustration.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

- **Excel:** Praised for its flexibility and transparent calculations. Users trust it because they can see and control the logic, which is a core lesson for our "Show the Math" feature.
- **TurboTax:** Demonstrates how to guide a user through an overwhelmingly complex process with a simple workflow and clear explanations. This is a direct model for our core user journey.
- **Mint (Legacy):** The key takeaways are the power of zero-friction onboarding (get value almost instantly) and cognitive offloading ("we do the math for you"). This directly informs our CSV import and automated analysis goals.
- **YNAB:** Teaches the power of an opinionated, conceptually consistent UX. While we won't adopt its rigid methodology, the principle of having a clear point of view is valuable.
- **Rocket Money:** Its success comes from identifying clear "villains" (fees, subscriptions) and providing "relief UX" by solving painful tasks with one tap. We can frame market volatility or portfolio concentration as the "villain" our app helps users fight.
- **Empower:** Shows the value of a professional, "advisor-grade" visual language that builds trust and makes users feel sophisticated. Its high-signal dashboards are a model for our own.

### Transferable UX Patterns

- **Onboarding:** Adopt Mint's **zero-friction onboarding** for the CSV import to provide an immediate "Aha!" moment.
- **Core Workflow:** Adopt TurboTax's **guided, step-by-step workflow** to take the user from import → model → compare → action plan.
- **Dashboard Design:** Adopt Empower's **high-signal, professional dashboards** that prioritize key numbers like net worth, allocation, and performance.
- **Calculation Display:** Adapt Excel's **formula transparency** into our "Show the Math" feature, explaining calculations in plain English rather than code.

### Anti-Patterns to Avoid

- **Black Box Algorithms:** We must avoid hiding our calculations. If a user can't understand where a number from, they won't trust it. (Anti-Excel)
- **The Aimless Dashboard:** We must avoid the "Mint trap" of only showing data without providing a clear path forward. Every analysis must lead to an actionable insight or a clear decision to be made.
- **Aggressive Upselling:** We must avoid the "Empower trap." The goal is to build trust through powerful tools, not to use that trust as a sales funnel, which would be counter to our goal of providing unbiased advice.

### Design Inspiration Strategy

Based on this analysis, our strategy is as follows:

- **ADOPT:**
  - **TurboTax's Guided Workflow:** This will be the backbone of our core user journey.
  - **Empower's Professional Visuals:** We will aim for a serious, data-rich aesthetic that feels credible and sophisticated.

- **ADAPT:**
  - **Excel's Calculation Transparency:** We will adapt this by providing plain-English explanations for our calculations ("Show the Math"), ensuring trust.
  - **Rocket Money's "Clear Villains":** We will adapt this by personifying market risks (e.g., "The 2008 Crash Scenario") that the user can "fight" with our tool, creating a sense of empowerment.

- **AVOID:**
  - **YNAB's Rigid Dogma:** We will empower users with a powerful tool, not force them into a strict budgeting religion.
  - **Mint's "Dashboard-Only" Trap:** We will ensure every screen has a purpose that drives the user toward a decision or action.

## Design System Foundation

### 1.1 Design System Choice

**MUI (Material-UI)** will be the chosen design system for the Portfolio Scenario Modeler.

### Rationale for Selection

This decision is driven by the project's priority for **maximum speed and features** in development, while still aiming for a professional and customizable aesthetic. MUI offers:

- **Accelerated Development:** A comprehensive library of ready-to-use, high-quality React components significantly reduces development time.
- **Professional Aesthetic:** Built on Material Design principles, it provides a clean, modern, and inherently trustworthy visual foundation, aligning with our "advisor-grade" goal.
- **Theming Flexibility:** Despite its established look, MUI is highly themeable, allowing for deep customization of colors, typography, and spacing to build a unique brand identity without sacrificing development velocity.
- **Robustness & Community Support:** As a widely adopted and mature system, it comes with extensive documentation, a large developer community, and built-in accessibility features, which are crucial for our privacy-first approach.

### Implementation Approach

We will begin by leveraging MUI's default components to rapidly construct the application's interface. Themings will be applied early to establish a consistent look and feel. Custom components will only be developed when MUI does not offer the required functionality or when a highly unique interaction pattern is essential for the core user experience.

### Customization Strategy

Our customization strategy will focus on theming MUI to align with our brand's desired emotional response (e.g., trust, clarity, empowerment). This includes:

- Defining a custom color palette that evokes professionalism and calm.
- Selecting typography that enhances readability and information hierarchy.
- Adjusting spacing and shadows to create a clear and uncluttered interface.
- Prioritizing consistency with MUI's established patterns where they align with our UX principles.
- Avoiding overly complex visual customizations that might compromise performance or maintainability, especially given the platform strategy (modern browser, fluid UI).

## Visual Design Foundation

### Color System

Our color system is named **"Professional & Calm,"** designed to evoke feelings of trust, stability, and clarity.

- **Primary Color:** A deep, trustworthy **Blue** (`#1976D2`) will be used for key interactive elements and branding.
- **Secondary Color:** A muted, positive **Green** (`#4CAF50`) will be used to indicate success, positive returns, and favorable outcomes.
- **Accent & Borders:** A neutral **Light Grey** (`#B0BEC5`) will be used for borders, dividers, and secondary information.
- **Text & Background:** High-contrast dark grey text on a light grey/white background ensures maximum readability.

### Typography System

The typography will be clean, modern, and highly readable, reinforcing the "advisor-grade" feel of the application.

- **Typeface:** We will use **Roboto**, which integrates seamlessly with our chosen MUI design system and is optimized for screen readability.
- **Hierarchy:** A clear and consistent typographic scale will be used for headings, subheadings, and body text to guide the user's eye and make data easy to scan.
- **Tone:** The overall tone will be professional and serious, befitting a financial analysis tool.

### Spacing & Layout Foundation

The application's structure will be based on a consistent and rhythmic grid system.

- **Layout Feel:** The layout will be **structured and clear**, using generous white space to group information logically and prevent a feeling of clutter.
- **Spacing System:** An **8px grid system** will be used for all margins, padding, and component dimensions to ensure a harmonious and visually consistent interface.
- **Grid:** A **12-column responsive grid** will be used to ensure the layout adapts gracefully to different screen sizes.

### Accessibility Considerations

Accessibility is a core component of our visual foundation.

- **Color Contrast:** All text and UI elements will be checked to ensure they meet WCAG AA contrast ratio standards.
- **Typography:** The choice of Roboto and a clear type scale supports high legibility.
- **Design System:** MUI has a strong foundation for accessibility, which we will maintain and extend in our customizations.

## Design Direction Decision

### Design Directions Explored

We explored three distinct visual directions in the `ux-design-directions.html` showcase:

1.  **Classic Professional:** A familiar and trustworthy sidebar-based layout.
2.  **Modern & Focused:** A clean, spacious, top-navigation layout.
3.  **Data-Dense / "Advisor-Grade":** A multi-column layout focused on information density and control.

### Chosen Direction

We have selected **Direction 3: Data-Dense / "Advisor-Grade"** as the foundational visual approach for the Portfolio Scenario Modeler.

### Design Rationale (Enhanced)

This direction was chosen because it aligns with our "advisor-grade" aesthetic and empowers our sophisticated user. It avoids being a "black box" by being explicit about the factors and data. The core synthesis of our approach will be **"Progressive Density."** We will provide a powerful, data-rich command center that is accessible on demand, while ensuring the default view is clean and focused to avoid overwhelming the user.

### Implementation Approach (Enhanced)

- The primary layout will be a multi-column grid, but the default view will be streamlined, focusing on the most critical information.
- A prominent and clear toggle (e.g., "Pro Mode" or "Show Details") will be available to expand the view to its full data-dense state.
- MUI components will be styled for a compact presentation in "Pro Mode," while the default view will use more white space.
- Visual hierarchy will be used to guide the user's attention, even in the dense layout.

## User Journey Flows

### Journey 1: Onboarding / Initial Portfolio Setup

This journey is designed to be a "magic" moment that builds instant trust and demonstrates value. It replaces the anxiety of a blank screen with immediate insight. The goal is to get the user from raw, messy data to their first "Edit -> Recalculate -> Review" loop as frictionlessly as possible.

```mermaid
graph TD
    A[Start: Dashboard with Demo Portfolio] --> B{CTA: "Initialize Portfolio"};
    B --> C{Select Input: Manual vs. Magic Import};
    C --> E[Magic Import: Paste CSV/Text];
    E --> F[System Parses Data];
    F --> G{Data Confirmation Modal};
    G -- Confirm & Load --> H[Portfolio Loaded: Split-Screen View];
    H --> I[Subtle Pulse on 'Target' Sliders];
    I --> J[User Adjusts Allocation];
    J --> K["Recalculate" Button Activates];
    K --> L[User Clicks "Recalculate"];
    L --> M[Charts Update with Shimmer];
    M --> N[End: First "Edit -> Recalculate -> Review" loop complete];

    subgraph Error Recovery
        F -- Parsing Fails --> F1[Highlight Specific Bad Lines in Raw Text];
        F1 --> E;
    end
```

### Journey 2: Model and Compare Scenarios

This is the core interactive loop of the application. The design is centered on a "Head-to-Head" comparison, allowing the user to form a hypothesis, make an adjustment, and immediately see the calculated impact, fostering a feeling of control and competence.

```mermaid
graph TD
    A[Start: Split-Screen Dashboard] --> B[User forms hypothesis];
    B --> C[Adjusts allocation sliders in "Target Portfolio"];
    C --> D[System auto-updates "Unallocated" bucket];
    D --> E["Recalculate" button glows];
    E --> F[User clicks "Recalculate"];
    F --> G[Charts and HUD metrics update];
    G --> H{Satisfied with results?};
    H -- No --> B;
    H -- Yes --> I[End: Proceeds to "Generate Action Plan"];

    subgraph Add New Asset
        C --> C1{"Need to add a new asset?"};
        C1 -- Yes --> C2[Use "Add Asset" search bar];
        C2 --> C;
    end
```

### Journey 3: Generate Action Plan

This journey is the bridge from analysis to reality. It's designed as a satisfying "payoff" moment, transitioning the user from thinking to doing. It replaces a static report with a living, interactive checklist.

```mermaid
graph TD
    A[Start: User clicks "Generate Action Plan"] --> B[Modal Overlay Transition];
    B --> C[System calculates Net Difference];
    C --> D[Logically groups into Sells & Buys];
    D --> E[Display Smart Checklist: <br>1. "Raise Cash" (Sells)<br>2. "Invest" (Buys)];
    E --> F{User executes trades at brokerage};
    F --> G[User checks off items in app];
    G --> H{All items checked?};
    H -- No --> G;
    H -- Yes --> I["Done" button activates];
    I --> J[User clicks "Done"];
    J --> K[Celebration Animation];
    K --> L[End: Redirect to Dashboard with updated portfolio];
```

### Flow Optimization Principles

- **Guided Action:** Use visual cues (glowing buttons, pulsing highlights) to suggest the user's next logical action.
- **In-Context Error Recovery:** Don't just fail; show the user exactly where an error is and how to fix it (e.g., highlighting bad CSV lines).
- **Frictionless State Management:** The app should always provide clear feedback on its state, whether through persistence (local storage) or smart UI changes (the "Recalculate" button).

## Component Strategy

Our strategy is to leverage the robust foundation of the **MUI** design system for base components while creating a set of specialized, custom components to deliver our unique, "advisor-grade" user experience.

### Design System Components

We will use the following standard MUI components as the foundation for our UI, benefiting from their accessibility, responsiveness, and theming capabilities:

- **Layout:** `Grid`, `Box`, `Container`, `AppBar`, `Paper` (for structural elements)
- **Inputs:** `TextField`, `Slider`, `Checkbox`, `List`, `Select` (for user input and display)
- **Feedback:** `Snackbar`, `Dialog`, `Tooltip` (for system feedback and contextual help)
- **Data Display:** `Card`, `List`, `Table` (for presenting information, will be enhanced with `MUI X Data Grid`)
- **Action:** `Button`, `IconButton`, `Fab` (for user actions)

### Custom & Specialized Components

The following specialized components will be developed to meet our specific UX requirements, often extending or wrapping MUI base components:

#### 1. "Magic" CSV Importer

- **Purpose:** To enable zero-friction onboarding by intelligently parsing raw Fidelity CSV data.
- **Base:** `MUI TextField` (multiline).
- **Implementation Detail:** We will implement a 'Client-Side Parser' service that runs regex validation against the text immediately, returning a structured JSON object or highlighting specific error lines without hitting the backend.

#### 2. "Head-to-Head" HUD

- **Purpose:** To provide a sticky, real-time comparison of key metrics between current and target portfolios.
- **Base:** Sticky `MUI AppBar` or `Paper`.
- **Implementation Detail:** This will be built as a `ContextConsumer` that subscribes directly to the `PortfolioState` to ensure the 'Delta' metrics update in near-real-time (sub-16ms) without re-rendering the whole page.

#### 3. Enhanced Allocation Sliders

- **Purpose:** To allow intuitive adjustment of portfolio allocations while maintaining a valid 100% total and providing risk feedback.
- **Base:** `MUI Slider`.
- **Implementation Detail:** We need a "Connected Slider Group" component. When one slider moves, it must automatically adjust a "Cash / Unallocated" bucket. If this bucket goes negative, it must visibly indicate an error state.

#### 4. Smart Action Plan Checklist

- **Purpose:** To replace static trade lists with an interactive, persistent, and actionable checklist.
- **Base:** `MUI List` and `Checkbox`.
- **Implementation Detail:** The state of these checkboxes should be saved to `localStorage` immediately so if the user accidentally refreshes, they don't lose their place in the trade execution process.

#### 5. Specialized Charting

- **Purpose:** To visually represent portfolio allocations and scenario performance transparently.
- **Selection:** We will integrate the **Recharts** library due to its lightweight, composable, and React-native architecture.
- **Custom Component:** A `<PortfolioComparisonChart />` wrapper will be created to handle the specific visualization of the "Dotted Line" (Current Portfolio) vs. "Solid Line" (Target Portfolio).

#### 6. "Advisor-Grade" Data Grid

- **Purpose:** To display detailed portfolio data compactly, aligning with our "Data-Dense" design direction.
- **Solution:** We will use **`MUI X Data Grid`** (Community Edition).
- **Customization:** We will configure `density="compact"` by default and override cell padding to maximize data visibility on a single screen.

#### 7. "Pro Mode" Layout Toggle

- **Purpose:** To allow users to switch between streamlined and data-dense views ("Progressive Density").
- **Solution:** A `<DensityProvider>` component will wrap the entire application. It will pass an `isProMode` boolean prop to all children, enabling them to dynamically adjust their margins, padding, and font sizes.
- **Design Note (from UX):** The "Pro Mode" or "Dense" view must be as intentionally designed as the simple view. It is not merely a matter of reducing spacing, but a curated, alternative presentation of the information that respects visual hierarchy and avoids cognitive overload.

### Component Implementation Strategy

Our strategy is to prioritize a **"build vs. buy"** approach for components:

- **Leverage MUI Defaults:** Utilize standard MUI components directly where they meet our needs, benefiting from their accessibility, theming, and robustness.
- **Extend/Wrap MUI:** For specialized needs, we will extend or wrap MUI components, injecting our custom logic and styling while maintaining the MUI foundation.
- **Integrate Best-of-Breed:** For complex domains like charting, we will integrate purpose-built React libraries (like Recharts) and create custom wrappers to ensure visual consistency with our MUI theme.
- **Accessibility & Performance First:** All custom components will be designed with accessibility (WCAG AA) and performance (sub-500ms calculations, responsive UI) as core tenets.

### Implementation Roadmap

We propose a phased implementation to deliver core value quickly:

- **Phase 1 - Core Onboarding & Modeling:** Focus on components critical for the initial user experience: "Magic" CSV Importer, "Advisor-Grade" Data Grid, "Head-to-Head" HUD, Enhanced Allocation Sliders, and Specialized Charting. These are necessary to enable the central "Model and Compare" loop.
- **Phase 2 - Action & Usability Enhancements:** Implement components that complete the user's action cycle and enhance personalization: Smart Action Plan Checklist and the "Pro Mode" Layout Toggle.

## UX Consistency Patterns

The following patterns will be applied consistently across the application to ensure a predictable, intuitive, and trustworthy user experience, building upon our chosen MUI design system and "Data-Dense / Advisor-Grade" direction.

### 1. Button Hierarchy

Our button strategy will clearly differentiate primary, secondary, and tertiary actions, guiding the user towards critical interactions.

- **Primary Action (e.g., "Generate Action Plan"):** Prominent, filled button using our `--color-primary` (Deep Blue) for high visibility. These buttons indicate the most important next step in a workflow.
- **Secondary Action (e.g., "Recalculate Scenarios"):** Outlined button using `--color-primary` for its text and border, with a transparent background. Used for important but non-final actions within a flow.
- **Tertiary/Contextual Actions:** Text-only buttons or icon buttons, used for less prominent actions, filters, or within data tables.

### 2. Feedback Patterns

These patterns ensure clear and consistent communication of system status, reducing user anxiety and building trust.

- **"Stale" / Unsynced State:** When user input changes data but a recalculation hasn't occurred (e.g., slider adjustment), affected UI elements and the "Recalculate" button will acquire a subtle **amber glow**. This non-intrusive cue signals that the displayed results are "unsynced changes."
- **"Success" / Synced State:** Upon successful completion of a short process (e.g., a recalculation taking <1s), a brief, elegant **"shimmer" animation** will play over the updated charts and metrics, providing clear, positive confirmation.
- **"Action" Feedback:** Checking an item in the `Smart Action Plan Checklist` will cause the item to **dim and strike through**, accompanied by a micro-interaction (e.g., a subtle sound or haptic feedback) to reinforce progress.

### 3. Form Patterns

These patterns ensure data entry is forgiving, precise, and user-friendly, especially for complex operations like portfolio import.

- **Forgiving Input:** The "Magic" CSV Importer will be designed to accept messy, pasted text. The system will internally clean and structure the data, presenting a refined view for user confirmation.
- **Line-Item Error Highlighting:** In multi-line text inputs (like the CSV importer), errors will be highlighted at the specific line level, with an accompanying tooltip explaining the issue (e.g., "Expected 3 columns, found 4"). The entire input will not be rejected.
- **Smart Sliders:** The `Enhanced Allocation Sliders` will function as a "Connected Slider Group". When one slider's value is increased, the "Cash / Unallocated" slider will automatically decrease by the same amount. If the user's adjustments would result in a negative cash balance, the slider being moved will turn **red** and its movement will be blocked, preventing an invalid state.

### 4. Navigation Patterns

Navigation will support our "Data-Dense" layout and provide efficient access to information.

- **Primary Navigation:** Will utilize a persistent top `AppBar` for core global sections (Dashboard, Stress Test, Action Plan).
- **Secondary/Contextual Navigation:** Within major content areas (e.g., the Stress Test view), tabs or accordions will be used for deeper organization of information, particularly when the "Pro Mode" is active.
- **Embedded Navigation:** Relevant actions and links will be placed intuitively within the content itself, e.g., "Model Solutions" button adjacent to a risk alert.

### 5. Additional Patterns

- **Modal and Overlay Patterns:** For critical confirmations (e.g., data import confirmation) or focused tasks (e.g., "Generate Action Plan" checklist), modal overlays will be used to ensure user attention. They will be clearly dismissible with a primary action button and an optional secondary close action.
- **Empty States & Loading States:**
  - **Empty States:** The initial "Demo Portfolio" will serve as a rich empty state for onboarding, illustrating value before user data is input. For other empty data states (e.g., no saved scenarios), a clear message and a primary CTA to create new content will be provided.
  - **Loading States:** Fast operations (<1s) will use a "shimmer" effect on the loading content. Longer operations will use a clear, but unobtrusive, progress indicator (e.g., a slim progress bar at the top of the screen) to manage expectations.
- **Search and Filtering Patterns:** When adding new assets or filtering lists, a unified search bar with autocomplete suggestions will be provided, ensuring quick access to relevant data. Results will update in real-time as the user types.

## Responsive Design & Accessibility

### Responsive Strategy

Our responsive strategy adapts the user experience across devices based on the principle of "Progressive Density," maintaining full functionality where appropriate and offering a curated companion experience on smaller screens.

- **Desktop Strategy (Priority):** We maintain the multi-column, data-dense layout as our baseline, leveraging ample screen real estate for simultaneous display of allocation controls, scenario results, and the action plan.
- **Tablet Strategy ("Adaptive Density"):**
  - **Landscape (iPad Pro/Air):** Treated as "Desktop-Lite." We will maintain the Split-Screen (Current vs. Target) view, but reduce margins and hide the sidebar navigation into a "Hamburger" menu to maximize canvas space for charts and data.
  - **Portrait:** Transitions to a "Tabbed View." This separates "Input" (Target Modeler), "Output" (Analysis/Charts & HUD), and "Current Portfolio" (ReadOnly) into distinct tabs, optimizing for limited horizontal real estate.
- **Mobile Strategy ("The Executive Companion"):**
  - **Philosophy:** Mobile is strictly for Review & Execution, not deep modeling. This aligns with the user's primary mobile need to check status and act on plans.
  - **Capabilities:** Users can view their Current Portfolio and Saved Scenarios. The "Smart Action Plan Checklist" feature is fully functional, enabling users to mark off trades directly from their mobile device.
  - **Restriction:** The "Scenario Modeler" (sliders/editing) is disabled or hidden on mobile for the MVP to prevent frustration due to complexity on a small screen.
  - **Navigation:** A clean Bottom Tab Bar will be used for primary navigation: `[Dashboard] | [Saved Plans] | [Checklist]`.

### Breakpoint Strategy

We will utilize standard breakpoints to manage layout adaptations, with a "mobile-first" approach for content presentation within each breakpoint, though the overall design remains desktop-centric.

- **Mobile (<600px): `xs`** - Focus on the "Executive Companion" view, using a Bottom Navigation and simplified list views.
- **Tablet Portrait (600px - 960px): `sm`** - Implements the "Tabbed Modeler" for core functionality.
- **Tablet Landscape (960px - 1280px): `md`** - Presents a "Split Screen" view with a collapsed sidebar, optimizing for broader tablet displays.
- **Desktop (>1280px): `lg` & `xl`** - Delivers the full "Advisor-Grade Experience" with a persistent sidebar and maximal data density.

### Accessibility Strategy

We are committed to achieving **WCAG 2.1 Level AA Compliance** to ensure our sophisticated tool is accessible to all users.

- **Keyboard Navigation:** Crucial for power users and accessibility. We will ensure all interactive elements, especially the `MUI X Data Grid`, are fully navigable using keyboard (e.g., Tab, Arrow Keys for grid cells) without requiring a mouse.
- **Screen Readers:**
  - The Split-Screen layout will utilize distinct ARIA landmarks (e.g., `aria-label="Current Portfolio"`, `aria-label="Target Scenario"`) for clear context.
  - The "Recalculate" button will use `aria-live="polite"` to announce when calculation results are updated or stale, providing auditory feedback on system status.
- **Color Contrast:** Our "Data-Dense" theme will be meticulously audited to ensure all text, icons, and interactive elements meet or exceed the WCAG 2.1 AA contrast ratio of 4.5:1, even with our chosen color palette and density.

### Testing Strategy

Ensuring responsive behavior and accessibility compliance will be integrated into our QA process.

- **Responsive Testing:** Will include rigorous testing on actual physical devices (various mobile phones, tablets) and across major browsers (Chrome, Firefox, Safari, Edge) to validate layout adaptation and touch targets. Network performance will also be tested on various device types.
- **Accessibility Testing:** Will involve a combination of automated accessibility testing tools (e.g., Lighthouse, AXE DevTools), manual screen reader testing (e.g., NVDA, VoiceOver), and comprehensive keyboard-only navigation testing. We will also utilize color blindness simulation tools.
- **User Testing:** User acceptance testing will actively include individuals with disabilities, and testing will be conducted on actual target devices with diverse assistive technologies where possible.

### Implementation Guidelines

Developers will adhere to the following guidelines:

- **Responsive Development:** Utilize responsive MUI components, CSS Grid, and Flexbox with relative units (`rem`, `%`, `vw`, `vh`). Implement mobile-first media queries, ensuring touch targets are generous (min 44x44px).
- **Accessibility Development:** Prioritize semantic HTML5 structure, integrate appropriate ARIA attributes for complex components (e.g., sliders, charts), and implement robust focus management and skip links for keyboard users. Support for high contrast modes will be considered.
